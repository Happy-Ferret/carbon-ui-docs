import React, { Component, PropTypes } from 'react'
import { Animated, View } from 'react-native-universal'
import { Animations } from 'carbon-ui'
import { animate } from 'uranium'

class Route extends Component {
  state = { visible: this.props.active }
  
  componentWillReceiveProps(next) {
    const { active } = this.props
    if (active && !next.active) {
      Animations.standard(this._activateAV, 0, 112).start(() => {
        this.setState({ visible: false })
      })
    } else if (!active && next.active) {
      this.setState({ visible: true })
      Animations.standard(this._activateAV, 1, 225, 112).start()
    }
  }
  
  _activateAV = new Animated.Value(this.props.active ? 1 : 0)
  
  render() {
    if (!this.state.visible) return <View />
    
    return (
      <Animated.View style={animate('opacity', 0, 1, this._activateAV)}>
        {this.props.children}
      </Animated.View>
    )
  }
}

Route.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
}

export default Route