import React, { Component } from 'react';
import { Chart } from 'primereact/chart';

class DataChart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            chartData: null
        }

        this.lineStylesData = {
            labels: [],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [],
                    fill: false,
                    tension: .4,
                    borderColor: '#42A5F5'
                },
                {
                    label: 'Second Dataset',
                    data: [],
                    fill: false,
                    borderDash: [5, 5],
                    tension: .4,
                    borderColor: '#66BB6A'
                },
                {
                    label: 'Third Dataset',
                    data: [],
                    fill: true,
                    borderColor: '#FFA726',
                    tension: .4,
                    backgroundColor: 'rgba(255,167,38,0.2)'
                }
            ]
        };
        this.options = this.getLightTheme();
    }

    getLightTheme() {
        let basicOptions = {
            maintainAspectRatio: false,
            aspectRatio: .6,
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };
        return basicOptions
    }

    // componentDidMount(){
    //     this.chartData()
    // }

    chartData = () => {
        const calculatedData = this.props.data;
        const deposit = [...calculatedData].map(val => val.deposit && val.deposit.toFixed(0));
        const gain = [...calculatedData].map(val => val.gain && val.gain.toFixed(0));
        const balance = [...calculatedData].map(val => val.balance && val.balance.toFixed(0));
        const withdrawal = [...calculatedData].map(val => val.withdrawal && val.withdrawal.toFixed(0));
        
        const data = {...this.lineStylesData};
        
        for(let i=0; i<this.props.years; i++) {
            data.labels[i] = 'year '+(i+1)
        }

        for(let i=0; i<data.datasets.length; i++){
            let dataset = data.datasets[i]
            dataset.label = Object.keys(calculatedData[i])[i]

            if(dataset.label === 'deposit') {
                dataset.data = Object.values(deposit)
            }
            else if(dataset.label === 'gain') {
                dataset.data = Object.values(gain)
            }
            else if(dataset.label === 'balance') {
                dataset.data = Object.values(balance)
            }
            else if(dataset.label === 'withdrawal') {
                dataset.data = Object.values(withdrawal)
            }
        }

        this.setState({chartData: data})
    }

    render() {
        return (
            <div style={{padding: 20}}>
                <div className="card">
                    <h5>Investment chart</h5>
                    <Chart type="line" data={this.state.chartData} options={this.options.basicOptions} />
                </div>
            </div>
        )
    }
}

export default DataChart