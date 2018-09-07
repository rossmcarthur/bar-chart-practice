import * as d3 from "d3";
import React from 'react';
import { connect } from 'react-redux';

class AgeChart extends React.Component {
  componentDidMount() {
    let margin = { left: 100, top: 20, bottom: 100, right: 20 };
    const users = this.props.users.sort((a, b) => {
      return a.dob.age - b.dob.age;
    });

    let counts = {};

    users.forEach( user => {
      if (user.dob.age in counts) {
        counts[user.dob.age]++;
      } else {
        counts[user.dob.age] = 1;
      }
    });


    let width = 600 - margin.left - margin.right;
    let height = 400 - margin.top - margin.bottom;

    let g = d3.select('#age-chart-area')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
          .append('g')
            .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

    g.append('text')
      .attr('x', 50 + (width / 3))
      .attr('y', height + 70)
      .attr('font-size', '20px')
      .text('Age (y)');

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
        .domain(users.map( d => {
          return d.dob.age;
        }))
        .range([0, width])
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

      let ages = g.selectAll('rect')
            .data(users);


      ages.enter()
        .append('rect')
          .attr('y', d => {
            return y(counts[d.dob.age]);
          })
          .attr('x', d => x(d.dob.age) )
          .attr('width', x.bandwidth)
          .attr('height', d => {
            return height - y(counts[d.dob.age]);
          })
          .attr('fill', 'green');
  }

  render() {
    return(
      <div id='age-chart-area'>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.entities
  };
};

export default connect(mapStateToProps)(AgeChart);
