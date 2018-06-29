import React, {Component, cloneElement} from 'react';
import PropTypes from 'prop-types';
import {isFunction, isPromise} from '@common-js/utils';

/**
 * 作用：懒加载弹框组件
 * @param ComposeComponent
 * @returns {{propTypes, defaultProps, new(*=): LazyComponent, prototype: LazyComponent}}
 * @constructor
 */
export default function LazyDialog(ComposeComponent) {
  return class LazyComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        //如果isLazy为false，则默认为ComposeComponent
        component: !this.props.isLazy && ComposeComponent
      }
    }

    static defaultProps = {
      isLazy: true
    };

    static propTypes = {
      isLazy: PropTypes.bool,
      onCheck: PropTypes.func,
      onCheckPromise: PropTypes.func
    };

    handleShow = (ev) => {
      let {
        onCheck,
        onCheckPromise
      } = this.props;

      /**
       * 加载组件之前做的一些操作，比如一些判断条件影响组件加载
       * onCheck返回值为false的时候不加载组件
       * onCheck返回值为Promise的时候检查onCheckPromise返回值
       */
      if (isFunction(onCheck)) {
        let result = onCheck(ev);
        if (isPromise(result)) {
          result.then((data) => {
            if (isFunction(onCheckPromise) && onCheckPromise(data) === false) {
              return false;
            }
            this.show();
          }).catch(() => {
            this.show();
          });
        }
        if (result === false) {
          return false;
        }
      }
      this.show();
    };

    show = () => {
      let {
        component
      } = this.state;
      if (component) {
        this.dialog.show && this.dialog.show();
      } else {
        this.setState({
          component: ComposeComponent
        }, () => {
          this.dialog.show && this.dialog.show();
        })
      }
    };

    render() {
      let props = this.props;
      let {component: Component} = this.state;
      let {children, ...rest} = props;
      let childrenProps = children.props;
      return (
        cloneElement(
          children,
          {
            onClick: this.handleShow
          },
          [
            childrenProps.children,
            !!Component &&
            <Component {...rest} parent={this} key="LazyComponent"/>
          ]
        )
      )
    }
  }
}
