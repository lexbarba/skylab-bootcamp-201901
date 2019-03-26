import React, {useState} from 'react'
import PropTypes from 'prop-types'
import AtomButton from '@schibstedspain/sui-atom-button'
import AtomInput from '@s-ui/react-atom-input'

function BarbasSearchBar({onQuerySubmit}) {
  const [query, setQuery] = useState(null)

  return (
    <div className="sktest-BarbasSearchBar">
      <form className="sktest-BarbasSearchBar-wrapper">
        <AtomInput
          className="sktest-BarbasSearchBar-input"
          name="input"
          size="m"
          type="text"
          placeholder="Type in your query!"
          onChange={e => {
            e.preventDefault()
            setQuery(e.target.value)
          }}
        />
        <AtomButton
          className="sktest-BarbasSearchBar-button"
          onSubmit={e => {
            e.preventDefault()
            e.stopPropagation()
            onQuerySubmit(query)
          }}
        >
          Search
        </AtomButton>
      </form>
    </div>
  )
}

BarbasSearchBar.displayName = 'BarbasSearchBar'

// Remove these comments if you need
// BarbasSearchBar.contextTypes = {i18n: PropTypes.object}
BarbasSearchBar.propTypes = {
  onQuerySubmit: PropTypes.function
}
// BarbasSearchBar.defaultProps = {}

export default BarbasSearchBar
