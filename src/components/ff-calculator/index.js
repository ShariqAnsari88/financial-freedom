import React, { useState } from 'react';
import { useFormik } from 'formik';
import { IFR, ARW } from '../../shared/helpers';
import { InputNumber } from 'primereact/inputnumber';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';

import './style.scss';

const FinancialFreedomCalculator = (props) => {

    const [submitBtn, setSubmitBtn] = useState(false);

    const formik = useFormik({
        initialValues: {
            inititialAmount: 0,
            yearsOfInvestment: 0,
            yearsOfWithdrawal: 0,
            inflationRate: 0,
            inflationRateWithdrawal: 0,
            gainRate: 0,
            withdrawalRate: 0,
            includeCurrentYearGain: false,
        },
        validate: (data) => {
            let errors = {};

            if (!data.inititialAmount) {
                errors.inititialAmount = 'Initial amount is required.';
            }

            if (!data.yearsOfInvestment) {
                errors.yearsOfInvestment = 'Field is required.';
            }

            if (!data.yearsOfWithdrawal) {
                errors.yearsOfWithdrawal = 'Field is required.';
            }

            if (!data.inflationRate) {
                errors.inflationRate = 'Field is required.';
            }

            if (!data.inflationRateWithdrawal) {
                errors.inflationRateWithdrawal = 'Field is required.';
            }

            if (!data.gainRate) {
                errors.gainRate = 'Field is required.';
            }

            if (!data.withdrawalRate) {
                errors.withdrawalRate = 'Field is required.';
            }

            return errors;
        },
        onSubmit: (data) => {

            let formData = {
                inititialAmount: data.inititialAmount, 
                inflationRate: data.inflationRate,
                inflationRateWithdrawal: data.inflationRateWithdrawal,
                yearsOfInvestment: data.yearsOfInvestment,
                yearsOfWithdrawal: data.yearsOfWithdrawal,
                gainRate: data.gainRate,
                withdrawalRate: data.withdrawalRate, 
                includeCurrentYearGain: data.includeCurrentYearGain
            }
            props.getFormData(formData)

            calculateFFData(data,()=>{
                // formik.resetForm();
                props.updateChart()
            })
        }
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const calculateFFData = (data, callback) => {
        setSubmitBtn(true);
        setTimeout(() => {

            let obj = {
                investment: IFR(
                    data.inflationRate, 
                    data.yearsOfInvestment, 
                    data.inititialAmount, 
                    data.gainRate,
                    data.includeCurrentYearGain),
                withdrawal: ARW(
                    data.inflationRateWithdrawal, 
                    data.yearsOfWithdrawal,
                    data.withdrawalRate, 
                    data.gainRate)
            }
            
            setSubmitBtn(false);
            props.getTableData(obj);
            callback && callback();
            console.log(obj)
        }, 2000);
    }

    return (
        <form style={{padding: 20}} onSubmit={formik.handleSubmit}>
            <div className="p-grid p-fluid p-formgrid">
                <div className="p-field p-col-12 p-md-3">
                    <label htmlFor="inititialAmount" className={classNames({ 'p-error': isFormFieldValid('inititialAmount') })}>Initial Amount*</label>
                    <InputNumber 
                        name="inititialAmount" 
                        value={formik.values.inititialAmount} 
                        onValueChange={formik.handleChange} 
                        autoFocus 
                        mode="currency" 
                        currency="INR" 
                        currencyDisplay="code" 
                        locale="en-IN" 
                        className={classNames({ 'p-invalid': isFormFieldValid('inititialAmount') })}/>
                        {getFormErrorMessage('inititialAmount')}
                </div>

                <div className="p-field p-col-12 p-md-3">
                    <label htmlFor="yearsOfInvestment" className={classNames({ 'p-error': isFormFieldValid('yearsOfInvestment') })}>Years of Investment*</label>
                    <InputNumber 
                        name="yearsOfInvestment" 
                        value={formik.values.yearsOfInvestment} 
                        onValueChange={formik.handleChange} 
                        mode="decimal" min={0} max={100}
                        className={classNames({ 'p-invalid': isFormFieldValid('yearsOfInvestment') })} />
                        {getFormErrorMessage('yearsOfInvestment')}
                </div>

                <div className="p-field p-col-12 p-md-3">
                    <label htmlFor="yearsOfWithdrawal" className={classNames({ 'p-error': isFormFieldValid('yearsOfWithdrawal') })}>Years of Withdrawal*</label>
                    <InputNumber 
                        name="yearsOfWithdrawal" 
                        value={formik.values.yearsOfWithdrawal} 
                        onValueChange={formik.handleChange} 
                        mode="decimal" min={0} max={100}
                        className={classNames({ 'p-invalid': isFormFieldValid('yearsOfWithdrawal') })} />
                        {getFormErrorMessage('yearsOfWithdrawal')}
                </div>

                <div className="p-field p-col-12 p-md-3">
                    <label htmlFor="inflationRate" className={classNames({ 'p-error': isFormFieldValid('inflationRate') })}>Inflation Rate*</label>
                    <InputNumber 
                        name="inflationRate" 
                        value={formik.values.inflationRate} 
                        onValueChange={formik.handleChange} 
                        suffix="%"
                        className={classNames({ 'p-invalid': isFormFieldValid('inflationRate') })} />
                        {getFormErrorMessage('inflationRate')}
                </div>

                <div className="p-field p-col-12 p-md-3">
                    <label htmlFor="inflationRateWithdrawal" className={classNames({ 'p-error': isFormFieldValid('inflationRateWithdrawal') })}>Inflation Rate at Withdrawal Time*</label>
                    <InputNumber 
                        name="inflationRateWithdrawal" 
                        value={formik.values.inflationRateWithdrawal} 
                        onValueChange={formik.handleChange} 
                        suffix="%"
                        className={classNames({ 'p-invalid': isFormFieldValid('inflationRateWithdrawal') })} />
                        {getFormErrorMessage('inflationRateWithdrawal')}
                </div>

                <div className="p-field p-col-12 p-md-3">
                    <label htmlFor="gainRate" className={classNames({ 'p-error': isFormFieldValid('gainRate') })}>Expected Return on Investment*</label>
                    <InputNumber 
                        name="gainRate" 
                        value={formik.values.gainRate} 
                        onValueChange={formik.handleChange} 
                        suffix="%"
                        className={classNames({ 'p-invalid': isFormFieldValid('gainRate') })} />
                        {getFormErrorMessage('gainRate')}
                </div>

                <div className="p-field p-col-12 p-md-3">
                    <label htmlFor="withdrawalRate" className={classNames({ 'p-error': isFormFieldValid('withdrawalRate') })}>Withdrawal Rate*</label>
                    <InputNumber 
                        name="withdrawalRate" 
                        value={formik.values.withdrawalRate} 
                        onValueChange={formik.handleChange} 
                        mode="decimal" 
                        minFractionDigits={1} 
                        maxFractionDigits={5}
                        className={classNames({ 'p-invalid': isFormFieldValid('withdrawalRate') })} />
                        {getFormErrorMessage('withdrawalRate')}
                </div>

                <div className="p-field-checkbox p-col-12 p-md-3">
                    <Checkbox 
                        name="includeCurrentYearGain" 
                        checked={formik.values.includeCurrentYearGain} 
                        onChange={formik.handleChange} />
                    <label htmlFor="includeCurrentYearGain">Include Current Year Return</label>
                </div>

                <Button label="Calculate" loading={submitBtn} type="submit" style={{margin: '0.5rem'}} />
            </div>
        </form>
    )
}

export default FinancialFreedomCalculator;
