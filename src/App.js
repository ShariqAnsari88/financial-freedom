import React, { Component } from 'react'
import FinancialFreedomCalculator from './components/ff-calculator';
import Table from './components/data-table';
import DataChart from './components/data-chart';

// Primereact theme css
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            formData: {}
        }
        this.investmentChartRef = React.createRef()
        this.withdrawalChartRef = React.createRef()
    }

    getTableData = (data) => {
        this.setState({data})
    }

    getFormData = (formData) => {
        this.setState({formData})
    }

    updateChart = () => {
        this.investmentChartRef.current.chartData()
        this.withdrawalChartRef.current.chartData()
    }

    render() {
        return (
            <div>
                <FinancialFreedomCalculator 
                    getTableData={this.getTableData}
                    getFormData={this.getFormData} 
                    updateChart={this.updateChart}
                />

                {!!this.state.data && <>
                    <DataChart 
                        data={this.state.data.investment} 
                        formData={this.state.formData} 
                        years={this.state.formData.yearsOfInvestment} 
                        ref={this.investmentChartRef} 
                    />
                    <DataChart 
                        data={this.state.data.withdrawal} 
                        formData={this.state.formData} 
                        years={this.state.formData.yearsOfWithdrawal} 
                        ref={this.withdrawalChartRef} 
                    />
                </>}

                {!!this.state.data && <Table data={this.state.data} />}
            </div>
        )
    }
}

export default App
