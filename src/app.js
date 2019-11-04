/**
 * Created by 王冬 on 2019/3/21.
 * QQ: 20004604
 * weChat: qq20004604
 * 功能说明：
 *
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {saveData, getAllData} from './js/data_controller.js';
import './css/index.css';

// 代理管理
// list的值是一个二维数组，外面数组的每个元素表示一行（一个代理配置），每个元素共有3个子元素，分别代表 [代理前路径内容, 被替换路径内容, 扩展名]
class ProxyManager extends React.Component {
    lastDelete = 0;

    state = {
        list: [],
        isOpen: false,
        msg: ''
    };

    // 组件加载完成，初始化数据
    componentDidMount() {
        // if (process.env.npm_lifecycle_event === 'build') {
        // 读取全部数据
        getAllData(result => {
            // 代理是否开启
            const isOpen = result.isOpen || false;
            // 数据列表
            const list = result.list && result.list.length > 0 ? result.list : [['', '', '']];
            this.setState({
                isOpen,
                list
            });

            const bg = chrome.extension.getBackgroundPage();
            bg.changeOptions({
                isOpen,
                list
            });
        });
        // }
    }

    // 数据被改变时的生命周期
    componentDidUpdate(preProps, preState) {
        // if (process.env.npm_lifecycle_event === 'build') {
        if (preProps.isOpen !== this.state.isOpen) {
            const bg = chrome.extension.getBackgroundPage();
            bg.changeOptions(this.state);
        }
        // }
    }

    render() {
        return <div>
            <p><a href="http://119.3.214.234/proxy/proxy_description.html" target="_blank">点击查看说明文档</a></p>
            <h3>代理配置：</h3>
            <p>
                代理开启状态：
                {
                    this.state.isOpen ? <span className='is-open'>开启</span> : <span className='is-closed'>关闭</span>
                }
                <span>　　</span>
                <button onClick={this._changeOpen}>点击切换</button>
            </p>

            <table>
                <thead>
                <tr>
                    <td>原始路径被替换内容</td>
                    <td>替换后内容</td>
                    <td>正则表达式（无前后斜杠）</td>
                    <td>该行是否生效</td>
                    <td>删除</td>
                </tr>
                </thead>
                <tbody id="tbody">
                {
                    this.state.list.map((item, index) => {
                        return <tr key={index}>
                            <td>
                                <input className="key"
                                       value={item[0]}
                                       placeholder='必填'
                                       onChange={(e) => {
                                           this._onChange(index, 0, e.target.value);
                                       }}/>
                            </td>
                            <td>
                                <input className="value"
                                       value={item[1]}
                                       placeholder='必填'
                                       onChange={(e) => {
                                           this._onChange(index, 1, e.target.value);
                                       }}/>
                            </td>
                            <td>
                                <input className="ex"
                                       value={item[2]}
                                       placeholder='选填，正则语法'
                                       onChange={(e) => {
                                           this._onChange(index, 2, e.target.value);
                                       }}/>
                            </td>
                            <td>
                                {
                                    item[0].trim() ? <span className='is-open'>生效</span> :
                                        <span className='is-closed'>无效</span>
                                }
                            </td>
                            <td>
                                <button onClick={() => {
                                    this._deleteRow(index);
                                }}>删除
                                </button>
                            </td>
                        </tr>;
                    })
                }
                </tbody>
            </table>

            <button onClick={this.addRow}>新增一行</button>
            <span>　　</span>
            <button onClick={this._save}>保存</button>
            <br/>
            <br/>

            <h3>
                测试：
            </h3>
            <button onClick={this._addTestData}>添加测试数据</button>
            <br/>
            <p>复制链接【http://185.186.147.210/】点击访问1#服务器。代理如果开启，则访问的是2#服务器</p>
            <br/>
            {
                this.state.msg ? <p>{this.state.msg}</p> : null
            }
        </div>;
    }

    /**
     * 当修改数组内容时触发
     * @param arrayIndex list的index
     * @param eleIndex  list里面的元素，他的index
     * @param value 值
     */
    _onChange = (arrayIndex, eleIndex, value) => {
        const newList = this.state.list.map((ele, i) => {
            // 如果当前修改的不是，则修改他
            if (i !== arrayIndex) {
                return [...ele];
            } else {
                let newEle = [...ele];
                newEle[eleIndex] = value.trim();
                return newEle;
            }
        });
        this.setState({
            list: newList
        });
    };

    // 添加一行
    addRow = () => {
        this.setState({
            list: [...this.state.list, ['', '', '']]
        });
    };

    // 添加测试数据
    _addTestData = () => {
        this.setState({
            list: [...this.state.list, ['185.186.147.210', '103.94.185.215', '']]
        });
    };

    // 删除一行
    _deleteRow = (arrayIndex) => {
        // 防止连续点击导致误删除
        if (Number(new Date()) - this.lastDelete < 1000) {
            return;
        }
        const newList = this.state.list.filter((ele, i) => {
            return arrayIndex !== i;
        });
        this.setState({
            list: newList
        });
        this.lastDelete = new Date();
    };

    // 切换开启状态
    _changeOpen = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
        saveData({
            isOpen: !this.state.isOpen,
        }, result => {
        });
    };

    // 保存
    _save = () => {
        let newList = this.state.list.filter(item => {
            if (item[0].trim()) {
                return true;
            } else {
                return false;
            }
        });

        this.setState({
            msg: "--->>>保存中。。。<<<---"
        });

        const bg = chrome.extension.getBackgroundPage();
        bg.changeOptions(this.state);

        saveData({
            isOpen: this.state.isOpen,
            list: newList
        }, result => {
            this.setState({
                msg: '--->>>保存成功！<<<---'
            });

            setTimeout(() => {
                this.setState({
                    msg: ''
                });
            });
        });
    };
}

ReactDOM.render(
    <ProxyManager/>,
    document.getElementById('root')
);
