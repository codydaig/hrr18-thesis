import React from 'react'
import test from 'tape'
import {shallow} from 'enzyme'
import jsdom from 'jsdom'
import Office from '../client/src/components/Office/officeMain.jsx'

test('shallow', t => {
  const wrapper = shallow(<Office/>)
  t.equal(wrapper.contains(<div id='subscriber'/>), true)
  t.end()

})
