import {
  zoom,
  select,
  selectAll,
  event,
  drag
} from 'd3'

export const d3Zoom = () => (
  zoom()
    .scaleExtent([0.5, 10])
    .on("zoom", () => (
      selectAll('svg > g').attr('transform', event.transform)
    ))
)

export const d3Drag = () => {
  let t = {x: 0, y: 0}
  const dragStart = function () {
    t = {
      x: select(this).attr("tx")*1,
      y: select(this).attr("ty")*1
    }
    select(this)
      .attr('stroke', '#00FFFF')
      .attr('stroke-width', '2')
  }
  const dragDrag = function() {
    t.x += event.dx
    t.y += event.dy
    select(this)
      .attr("transform", function(d) { return "translate(" + t.x + "," + t.y + ")"; })
      .attr('tx', t.x)
      .attr('ty', t.y)
  }
  const dragEnd = function() {
    select(this)
      .attr('stroke', 'rgb(0, 0, 0)')
      .attr('stroke-width', '0')
  }
  return drag()
    .on('start', dragStart)
    .on('drag', dragDrag)
    .on('end', dragEnd)
}
