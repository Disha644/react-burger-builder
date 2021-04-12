import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() })

describe('<NavigationItems />', () => {

    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });

    it('should render two <NavigationItems/> if not autheticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render three <NavigationItems/> if autheticated', () => {
        wrapper.setProps({ isAuth: true });
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should show logout button if authenticated', () => {
        wrapper.setProps({ isAuth: true });
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    });
})