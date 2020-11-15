import { mount } from 'enzyme';
import React from 'react';

import BuildEnvironmentComponent from '../build-environment.component';

describe('build-environment.component', () => {
  beforeEach(() => {
    process.env = {
      NODE_ENV: 'test',
      PACKAGE_VERSION: '0.0.0',
      NEXT_PUBLIC_BUILD: 'test',
    };
  });

  test('load', () => {
    const wrapper = mount(<BuildEnvironmentComponent></BuildEnvironmentComponent>);
    expect(wrapper).not.toBeFalsy();
  });

  test('displays build', () => {
    const wrapper = mount(<BuildEnvironmentComponent></BuildEnvironmentComponent>);
    expect(wrapper.text()).toBe('Build 0.0.0 (test)');
  });
});
