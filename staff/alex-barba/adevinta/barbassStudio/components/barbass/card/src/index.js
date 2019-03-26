import React from 'react'
// import PropTypes from 'prop-types'
import AtomCard from '@s-ui/react-atom-card'
import AtomImage from '@s-ui/react-atom-image'

function BarbasCard() {
  const srcImageCar = 'http://images.com/my_image.jpg'
  const urlTarget = 'https://www.coches.net/'

  const CarImage = () => <AtomImage src={srcImageCar} alt="" />
  const CarInfo = () => (
    <div>
      <h2>My Title</h2>
      <p>My Description</p>
    </div>
  )

  return (
    <div className="sui-BarbasCard">
      <AtomCard
        media={CarImage}
        content={CarInfo}
        href={urlTarget}
        vertical
        highlight
      />
    </div>
  )
}

BarbasCard.displayName = 'BarbasCard'

// Remove these comments if you need
// BarbasCard.contextTypes = {i18n: PropTypes.object}
// BarbasCard.propTypes = {}
// BarbasCard.defaultProps = {}

export default BarbasCard
