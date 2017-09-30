/* @flow */
import React from 'react';
import ReactSlick from 'react-slick';

import Card from 'ui/components/Card';

// These are included in the repo via `react-slick`.
// eslint-disable-next-line import/no-extraneous-dependencies
import 'slick-carousel/slick/slick.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'slick-carousel/slick/slick-theme.css';
import './styles.scss';


type PropTypes = {|
  sections: Array,
|};

export default class Carousel extends React.Component {
  props: PropTypes;

  render() {
    const { sections } = this.props;

    return (
      <Card className="Carousel">
        <ReactSlick
          autoplay
          autoplaySpeed={5000}
          centerMode
          infinite
          slidesToScroll={1}
          slidesToShow={1}
          variableWidth
        >
          {(sections.map((section, i) => {
            // We have to wrap this content in a <div> or ReactSlick
            // won't apply the right properties to it.
            // eslint-disable-next-line react/no-array-index-key
            return <div key={`section-${i}`}>{section}</div>;
          }))}
        </ReactSlick>
      </Card>
    );
  }
}
