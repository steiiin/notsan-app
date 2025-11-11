import { useHabitusMultiplicator } from '@/composables/useHabitusMultiplicator'
import { round } from '@/service/math'
import { BmiCalculation, CurveCalculation, PatientCalculation } from '@/service/calculation'
import { HabitusModeValue, HabitusValue, ResultTypeValue, SexValue, WeightAccuracyValue, WeightEstimateByValue } from '@/types/patient'
import { defineStore } from 'pinia'
import { watch } from 'vue'

export const usePatientStore = defineStore('patient', {
  state: () => ({

    inputWeightAccuracy: 'direct' as WeightAccuracyValue,
    inputWeightEstimateBy: 'by-age' as WeightEstimateByValue,

    inputSex: 'male' as SexValue,
    inputAge: 12 as number,
    inputWeight: 80 as number,
    inputHeight: 180 as number,
    inputHabitus: 'normal' as HabitusValue,


    cache: {

      ageHash: '' as string,
      ageValue: 0 as number,

      weightHash: '' as string,
      weightValue: 0 as number,

    },

  }),
  getters: {

    /* private getters */

    _hashInputs(state): string {
      return state.inputWeightAccuracy + '|'
        + state.inputWeightEstimateBy + '|'
        + state.inputSex + '|'
        + String(state.inputAge) + '|'
        + String(state.inputWeight) + '|'
        + String(state.inputHeight) + '|'
        + state.inputHabitus
    },

    /* public getters */

    habitusMode(state): HabitusModeValue {
      if (state.inputWeightAccuracy == 'estimate' &&
        (
          (state.inputWeightEstimateBy == 'by-age' && state.inputAge <= 12) ||
          (state.inputWeightEstimateBy == 'by-height' && state.inputHeight <= 150 )
        )
      ) { return 'child' }
      else { return 'adult' }
    },

    hasResult(state): boolean {
      return this.resultType != 'undefined'
    },
    resultType(state): ResultTypeValue {

      // direct input
      if (state.inputWeightAccuracy == 'direct')
      {

        // filter empty value
        if (!state.inputWeight) { return 'undefined' }

        // check if Weight in valid range
        if (state.inputWeight > 0 && state.inputWeight < 500)
        {
          return 'direct'
        }
        else
        {
          return 'undefined'
        }

      }

      // estimate by ...
      if (state.inputWeightAccuracy == 'estimate')
      {

        // ... age
        if (state.inputWeightEstimateBy == 'by-age')
        {

          // filter empty value
          if (!state.inputAge) { return 'undefined' }

          // check if Age in valid range
          if (state.inputAge >= 0.01 && state.inputAge < 130)
          {
            return 'by-age'
          }
          else
          {
            return 'undefined'
          }

        }

        // ... height
        if (state.inputWeightEstimateBy == 'by-height')
        {

          // filter empty value
          if (!state.inputHeight) { return 'undefined' }

          // check if height in valid range
          if (state.inputHeight >= 30 && state.inputHeight < 300)
          {

            // use curve method for children
            if (state.inputHeight <= 150)
            {
              return 'by-height-curve'
            }

            // otherwise use BMI method
            else
            {
              return 'by-height-bmi'
            }

          }
          else
          {
            return 'undefined'
          }

        }

      }

      // in all other cases return nothing
      return 'undefined'


    },

    isEstimate(state): boolean {
      return state.inputWeightAccuracy == 'estimate'
    },

    isAgeInputUsed(state): boolean { return state.inputWeightAccuracy == 'estimate' && state.inputWeightEstimateBy == 'by-age' },
    isHeightInputUsed(state): boolean { return state.inputWeightAccuracy == 'estimate' && state.inputWeightEstimateBy == 'by-height' },
    isWeightInputUsed(state): boolean { return state.inputWeightAccuracy == 'direct' },

    // ##################################################################################

    isLikelyAnAdult(state): boolean {

      if (this.isAgeInputUsed)
      {
        return (state.inputAge >= 18)
      }

      const estimateAge = this.age
      if (estimateAge >= 18) { return true }
      if (estimateAge <= 12) { return false }

      const maturityScore = PatientCalculation.calculateMaturityScore(
        this.isHeightInputUsed ? state.inputHeight : undefined,
        this.isWeightInputUsed ? state.inputWeight : undefined,
        state.inputHabitus
      )
      if (estimateAge >= 16 && maturityScore >= 2) { return true }
      if (estimateAge >= 15 && maturityScore >= 4) { return true }
      if (maturityScore >= 5) { return true }

      return false

    },

    weight(state): number {

      const nextHash = this._hashInputs
      if (!isNaN(state.cache.weightValue) && nextHash == state.cache.weightHash) { return state.cache.weightValue }

      if (this.resultType == 'direct')
      {
        state.cache.weightValue = this.inputWeight
      }
      else if (this.resultType == 'by-age')
      {
        state.cache.weightValue = PatientCalculation.calculateWeightByAge(
          this.inputAge, this.inputSex, useHabitusMultiplicator(this.habitusMode, this.inputHabitus)
        )
      }
      else if (this.resultType == 'by-height-curve')
      {
        state.cache.weightValue = CurveCalculation.calculateChildWeightByHeight(
          this.inputSex, this.inputHeight, useHabitusMultiplicator(this.habitusMode, this.inputHabitus)
        )
      }
      else if (this.resultType == 'by-height-bmi')
      {
        state.cache.weightValue = BmiCalculation.calculateAdultWeightByHeight(
          this.inputSex, this.inputHeight, useHabitusMultiplicator(this.habitusMode, this.inputHabitus)
        )
      }
      else
      {
        return 0
      }

      state.cache.weightHash = this._hashInputs
      return state.cache.weightValue

    },

    age(state): number {

      const nextHash = this._hashInputs
      if (nextHash == state.cache.ageHash) { return state.cache.ageValue }

      if (this.isAgeInputUsed && this.hasResult)
      {
        state.cache.ageValue = state.inputAge
      }
      else
      {

        const estimates: number[] = []
        if (this.isHeightInputUsed)
        {
          const heightAge = PatientCalculation.calculateAgeByHeight(state.inputHeight, state.inputSex)
          estimates.push(heightAge)
        }
        if (this.isWeightInputUsed)
        {
          const weightAge = PatientCalculation.calculateAgeByWeight(state.inputWeight, state.inputSex)
          estimates.push(weightAge)
        }

        if (estimates.length == 0) { state.cache.ageValue = 0 }
        else
        {

          const estimate = estimates.reduce((sum, value) => sum + value, 0) / estimates.length
          if (estimate < 1) { state.cache.ageValue = round(estimate, 0.01) }
          else { state.cache.ageValue = round(estimate, 1) }

        }

      }

      state.cache.ageHash = this._hashInputs
      return state.cache.ageValue

    }

  },
  actions: {

    resetPatient() {

      this.inputWeightAccuracy = 'direct'
      this.inputWeightEstimateBy = 'by-age'
      this.inputSex = 'male'
      this.inputAge = 12
      this.inputWeight = 80
      this.inputHeight = 180
      this.inputHabitus = 'normal'

      this.cache.ageHash = ''
      this.cache.ageValue = 0
      this.cache.weightHash = ''
      this.cache.weightValue = 0

    },

  }
})
