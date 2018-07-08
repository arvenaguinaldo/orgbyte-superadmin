import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import Button from 'components/common/Button/Button';
import Spinner from 'components/common/Spinner/Spinner';

describe('<Button />', () => {

  const styles = require('components/common/Button/Button.scss');
  const href = 'http://honestbee.com/';
  const children = <span>text</span>;

  it('renders button element and children', () => {
    const wrapper = shallow(<Button>{children}</Button>);
    expect(wrapper.find('button')).to.have.length(1);
    expect(wrapper.contains(children)).to.equal(true);
  });

  context('disabled prop', () => {
    it('renders button element with disabled prop and href prop', () => {
      const wrapper = shallow(<Button disabled href={href} />);
      expect(wrapper.find('button')).to.have.length(1);
      expect(wrapper.find('a')).to.have.length(0);
    });

    it('pass disabled attribute to button element with disabled prop', () => {
      const wrapper = shallow(<Button disabled href={href} />);
      expect(wrapper.find('button').prop('disabled')).to.equal(true);
    });

    it('applies disabled class name with disabled prop', () => {
      const wrapper = shallow(<Button disabled>{children}</Button>);
      expect(wrapper.hasClass(styles.disabled)).to.equal(true);
    });
  });

  context('loading prop', () => {
    it('renders no Spinner component without loading prop', () => {
      const wrapper = shallow(<Button>{children}</Button>);
      expect(wrapper.contains(children)).to.equal(true);
      expect(wrapper.find(Spinner)).to.have.length(0);
    });

    it('renders Spinner component with loading prop', () => {
      const wrapper = shallow(<Button loading />);
      expect(wrapper.find(Spinner)).to.have.length(1);
      expect(wrapper.find(Spinner).first().prop('color')).to.equal('white');
    });

    it('applies loading class name with loading prop', () => {
      const wrapper = shallow(<Button loading>{children}</Button>);
      expect(wrapper.hasClass(styles.loading)).to.equal(true);
    });
  });
});
