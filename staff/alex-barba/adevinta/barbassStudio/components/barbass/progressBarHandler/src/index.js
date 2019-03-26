import React, {useReducer} from 'react'
// import PropTypes from 'prop-types'
import AtomProgressBar from '@s-ui/react-atom-progress-bar'
import MoleculeButtonGroup from '@s-ui/react-molecule-button-group'
import AtomButton from '@schibstedspain/sui-atom-button'

function BarbasProgressBarHandler() {
  let [value, setValue] = useReducer((state, action) => {
    switch (action) {
      case 'add1':
        return state + 1
      case 'add10':
        return state + 10
      case 'remove1':
        return state - 1
      case 'clear':
        return state - state
      default:
        return state
    }
  }, 0)

  return (
    <div className="sktest-BarbasProgressBarHandler">
      <h1>BarbasProgressBarHandler</h1>
      <div>
        <AtomProgressBar
          percentage={value}
          indicatorTotal
          size="large"
          type="circle"
        />
        <div className="sktest-BarbasProgressBarHandler-btn-wrapper">
          <MoleculeButtonGroup>
            <AtomButton
              size="large"
              onClick={() => {
                setValue('add1')
              }}
            >
              Add 1%
            </AtomButton>
            <AtomButton
              size="large"
              type="secondary"
              onClick={() => {
                setValue('add10')
              }}
            >
              Add 10%
            </AtomButton>
            <AtomButton
              size="large"
              type="tertiary"
              onClick={() => {
                setValue('remove1')
              }}
            >
              Remove 1%
            </AtomButton>
            <AtomButton
              size="large"
              type="accent"
              onClick={() => {
                setValue('clear')
              }}
            >
              Clear Loading Circle
            </AtomButton>
          </MoleculeButtonGroup>
        </div>
      </div>
    </div>
  )
}

BarbasProgressBarHandler.displayName = 'BarbasProgressBarHandler'

// BarbasProgressBarHandler.propTypes = {}
// BarbasProgressBarHandler.defaultProps = {}

export default BarbasProgressBarHandler
