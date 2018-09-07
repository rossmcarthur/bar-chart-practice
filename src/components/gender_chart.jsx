import * as d3 from 'd3';
import React from 'react';
import { connect } from 'react-redux';

class GenderChart extends React.Component {
  componentDidMount() {
    let margin = { left: 100, top: 20, bottom: 100, right: 20 };
    let width = 600 - margin.left - margin.right;
    let height = 400 - margin.top - margin.bottom;
    let counts = {};

    this.props.users.forEach( user => {
      if (user.gender in counts) {
        counts[user.gender]++;
      } else {
        counts[user.gender] = 1;
      }
    });

    let g = d3.select('#gender-chart-area')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
          .append('g')
            .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

    g.append('text')
      .attr('x', 0)
      .attr('y', height + 70)
      .attr('font-size', '20px')
      .text('Gender (m/f)');

    g.append('text')
      .attr('x', -50 - (height / 2))
      .attr('y', -80)
      .attr('transform', 'rotate(-90)')
      .attr('font-size', '20px')
      .text('Count (#)');

      let y = d3.scaleLinear()
          .domain([0, Math.max(...Object.values(counts))])
          .range([height, 0]);

      let x = d3.scaleBand()
        .domain(this.props.users.map( d => {
          return d.gender;
        }))
        .range([0, width / 4])
        .paddingInner(0.3)
        .paddingOuter(0.2);

      let xAxisCall = d3.axisBottom(x);
      g.append('g')
        .attr('class', 'x-axis')
        .attr('transform', 'translate (0, ' + height + ')')
        .call(xAxisCall)
        .selectAll('text')
          .attr('y', '10')
          .attr('x', '-5')
          .attr('text-anchor', 'end')
          .attr('transform', 'rotate(-40)');

      let yAxisCall = d3.axisLeft(y)
          .ticks(Math.max(...Object.values(counts)));

      g.append('g')
        .attr('class', 'y-axis')
        .call(yAxisCall);

      let genders = g.selectAll('rect')
            .data(this.props.users);

      genders.enter()
        .append('rect')
          .attr('y', d => {
            return y(counts[d.gender]);
          })
          .attr('x', d => x(d.gender) )
          .attr('width', x.bandwidth)
          .attr('height', d => {
            return height - y(counts[d.gender]);
          })
          .attr('fill', 'green');
  }

  render() {
    return(
      <div id='gender-chart-area'>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    users: state.entities
  };
};

export default connect(mapStateToProps)(GenderChart);
