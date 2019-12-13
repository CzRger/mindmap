import {
  zoom,
  select,
  selectAll,
  event,
  drag,
  linkHorizontal
} from 'd3'

export const d3Zoom = () => (
  zoom()
    .scaleExtent([0.5, 10])
    .on("zoom", () => (
      selectAll('svg > g').attr('transform', event.transform)
    ))
)

export const d3Drag = (links) => {
  let t = {x: 0, y: 0}
  let nodeName = ''
  const pathConstructor = linkHorizontal()
    .x(function(d) { return d.y })
    .y(function(d) { return d.x });
  const dragStart = function () {
    t = {
      x: select(this).attr("tx")*1,
      y: select(this).attr("ty")*1
    }
    nodeName = event.subject.data.name
    select(this)
      .attr('stroke', '#00FFFF')
      .attr('stroke-width', '2')
  }
  const dragDrag = function() {
    t.x += event.dx
    t.y += event.dy
    if (event.subject.children) {
      links.forEach(v => {
        if (v.target.data.name === nodeName) {
          v.target.x = t.y
          v.target.y = t.x - 100
        }
        if (v.source.data.name === nodeName) {
          v.source.x = t.y
          v.source.y = t.x - 100
        }
      })
    } else {
      links.forEach(v => {
        if (v.target.data.name === nodeName) {
          v.target.x = t.y
          v.target.y = t.x - 100
        }
      })
    }
    select(this)
      .attr("transform", function(d) { return "translate(" + t.x + "," + t.y + ")"; })
      .attr('tx', t.x)
      .attr('ty', t.y)
    
    selectAll('.link')
      .attr("d",function(d){
        var start = {x: d.source.x, y: d.source.y + 100};
        var end = {x: d.target.x, y: d.target.y + 100};
        return pathConstructor({source: start, target: end});
      })
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
