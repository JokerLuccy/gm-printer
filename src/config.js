import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {Flex, Button} from 'react-gm';
import '../node_modules/react-gm/src/index.less';
import 'normalize.css/normalize.css';
import './style.less';
import Right from './right';
import _ from 'lodash';
import {printerJS} from './util';
import doPrint from './do_print';

class Config extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            config: props.config
        };

        this.debounceDoRender = _.debounce(this.doRender, 1000);
    }

    componentDidMount() {
        const $iframe = ReactDOM.findDOMNode(this.refIframe);
        this.$iframe = $iframe;

        const script = $iframe.contentWindow.document.createElement('script');
        script.src = printerJS;
        $iframe.contentWindow.document.body.append(script);

        script.addEventListener('load', () => {
            this.doRender();
        });
    }

    doRender = () => {
        const {config} = this.state;
        const {data, tableData} = this.props;
        this.$iframe.contentWindow.render({
            data,
            tableData,
            config
        });
    };

    handleUpdate = (config) => {
        this.setState({
            config
        }, () => {
            this.debounceDoRender();
        });
    };

    handleTestPrint = () => {
        const {data, tableData} = this.props;
        const {config} = this.state;

        doPrint({data, tableData, config});
    };

    handleSave = () => {
        const {onSave} = this.props;
        return onSave(this.state.config);
    };

    render() {
        const {config} = this.state;

        return (
            <Flex className="gm-printer-config" style={{height: '100%', width: '100%'}}>
                <Flex flex column style={{minWidth: '820px'}} className="gm-overflow-y">
                    <iframe
                        ref={ref => this.refIframe = ref}
                        style={{border: 'none', width: '100%', height: '100%'}}
                    />
                </Flex>
                <Flex column style={{width: '400px', minWidth: '400px'}}>
                    <Flex flex column className="gm-overflow-y">
                        <Right config={config} onUpdate={this.handleUpdate}/>
                    </Flex>
                    <Flex justifyBetween className="gm-padding-10">
                        <button className="btn btn-info" onClick={this.handleTestPrint}>测试打印</button>
                        <Button className="btn btn-success" onClick={this.handleSave}>保存</Button>
                    </Flex>
                </Flex>
            </Flex>
        );
    }
}

Config.propTypes = {
    data: PropTypes.object.isRequired,
    tableData: PropTypes.array.isRequired,
    config: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired
};

export default Config;
