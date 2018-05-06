/**
 * Created by hao.cheng on 2017/4/21.
 */
import React from 'react';
import {Card, Col, Row} from "antd";
import RechartAreaChart from './../components/charts/RechartAreaChart';
import RechartPieChart from './../components/charts/RechartPieChart';

const data = [
    {name: '2018-05-06', fin: 40, sav: 5, inl: 5},
    {name: '2018-05-07', fin: 30, sav: 6, inl: 9},
    {name: '2018-05-08', fin: 50, sav: 9, inl: 17},
    {name: '2018-05-09', fin: 45, sav: 15, inl: 27},
    {name: '2018-05-10', fin: 55, sav: 12, inl: 22},
    {name: '2018-05-11', fin: 47, sav: 9, inl: 21},
    {name: '2018-05-12', fin: 62, sav: 13, inl: 0},
];

const pieData = [
    {name: 'success', value: 90},
    {name: 'fail', value: 10}
];

class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="gutter-example">
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="近一周产品购买" bordered={false}>
                                <RechartAreaChart data={data}/>
                            </Card>
                        </div>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="理财产品购买成功率" bordered={false}>
                                <RechartPieChart pieData={pieData}/>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Home;