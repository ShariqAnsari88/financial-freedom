import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { numberWithCommas } from '../../shared/helpers';

import './style.scss';

class Table extends Component {

    getDeposit = (rowData) => {
        return numberWithCommas(rowData.deposit.toFixed(0))
    }
    getGain = (rowData) => {
        return numberWithCommas(rowData.gain.toFixed(0))
    }
    getBalance = (rowData) => {
        return numberWithCommas(rowData.balance.toFixed(0))
    }
    getWithdrawal = (rowData) => {
        return numberWithCommas(rowData.withdrawal.toFixed(0))
    }

    render() {
        return (
            <div style={{padding: 20}}>
                <div className="p-grid p-fluid p-formgrid">
                    <div className="p-field p-col-12 p-md-6">
                        <DataTable 
                            value={this.props.data.investment}
                            showGridlines stripedRows
                            header="Investment for retirement">
                            <Column field="deposit" header="Deposit" body={this.getDeposit}></Column>
                            <Column field="gain" header="Gain" body={this.getGain}></Column>
                            <Column field="balance" header="Balance" body={this.getBalance}></Column>
                        </DataTable>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <DataTable
                            value={this.props.data.withdrawal}
                            showGridlines stripedRows
                            header="After retirement withdrawal">
                            <Column field="gain" header="Gain" body={this.getGain}></Column>
                            <Column field="withdrawal" header="Withdrawal" body={this.getWithdrawal}></Column>
                            <Column field="balance" header="Balance" body={this.getBalance}></Column>
                        </DataTable>
                    </div>
                </div>
            </div>
        )
    }
}

export default Table;
