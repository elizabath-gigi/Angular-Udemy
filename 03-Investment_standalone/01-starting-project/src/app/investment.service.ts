import {Injectable} from '@angular/core';
import type{ InvestmentInput } from './investment-input.model';
@Injectable({providedIn:'root'})
export class InvestmentService{
    resultData?:{
        year: number;
        valueEndOfYear: number;
        interest: number;
        annualInvestment: number;
        totalInterest: number;
        totalAmountInvested: number;
      }[]
    calculateInvestmentResults(data:InvestmentInput) {
        const{initialInvestment,annualInvestment,duration,expectedReturn}=data;
        const annualData = [];
        let investmentValue = initialInvestment;
      
        for (let i = 0; i < duration; i++) {
          const year = i + 1;
          const interestEarnedInYear = investmentValue * (expectedReturn / 100);
          investmentValue += interestEarnedInYear + annualInvestment;
          const totalInterest =
            investmentValue - annualInvestment * year - initialInvestment;
          annualData.push({
            year: year,
            valueEndOfYear: investmentValue,
            interest: interestEarnedInYear,
            annualInvestment: annualInvestment,
            totalInterest: totalInterest,
            totalAmountInvested: initialInvestment + annualInvestment * year,
          });
        }
      
        this.resultData=annualData;
      }
}