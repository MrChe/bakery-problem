import React, {useState} from 'react';
import allCases from '../data/all_cases.json';
import { parseInputData, getResult, IData } from "../logic/bakery_problem";

const TYPE_OF_BREADS = ['Toast', 'Banana', 'Baguette', 'Sourdough', 'Rye', 'White', 'Wheat'] // 7
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] // 7

export default function Index() {

    const [resultData, setResultData] = useState({});


    const handleGenerate = (index: number) => () => {
        const parsedData = parseInputData(allCases[index]);
        const solution = getResult(parsedData);
        setResultData({...resultData, [index]: solution})
    }

    console.log('resultData', resultData);
    return (
        allCases.map((data: IData, index: number) => {
            return (
                <div key={index} style={{
                    padding: '20px'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: "center",
                        justifyContent: 'space-between',

                    }}>
                        <h1 style={{marginRight: '10px', color: 'green'}}>{DAYS[index]}</h1>{' '}
                        <div>
                            <p>
                                <span style={{ fontSize: '20px'}}>Type of Breads: </span>
                                {
                                    TYPE_OF_BREADS.slice(0, data.amount).map((bread: string, index: number) => {
                                        return (
                                            <b key={index} style={{ fontSize: '20px'}}>{bread} </b>
                                        )
                                    })
                                }
                            </p>
                            <p style={{ fontSize: '20px'}}>Amount: {TYPE_OF_BREADS.slice(0, data.amount).length}</p>
                        </div>
                        <button onClick={handleGenerate(index)}>Generate Result</button>
                    </div>


                    <div>
                        {
                            data.customers.map((customers, index: number) => {
                                return (
                                    <div key={index}>
                                        <p>Customer {index + 1} wants:{' '}
                                            {
                                                customers.map((bread, index: number) => {
                                                    return (
                                                        <span key={index}>
                                                            <i>{bread.amount}</i>
                                                            <i>{bread.type === "P" ? "Pan" : "Round"}</i>{' '}
                                                        </span>
                                                    )
                                                })
                                            }
                                        </p>

                                    </div>

                                )
                            })
                        }
                        <p>
                            <b>Result</b>: <i>{resultData[index]}</i>
                        </p>
                        </div>
                    </div>
            )
        })
    );
}




