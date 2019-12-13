import * as d3 from 'd3'
import {select} from 'd3'
import '../sass/css.scss'
import {
  d3Drag,
  d3Zoom
} from "@/utils/event";

export default {
  props: {
    trees: {
      type: Object,
      required : false,
      default: () => {}
    },
  },
  data () {
    return {
    }
  },
  mounted() {
    this.renderMap()
  },
  methods: {
    renderMap () {
      const width = 800
      const height = 800
      const svg = select(this.$refs.mountPoint)
        .attr("width", width)
        .attr("height", height)
      
      const root = d3.hierarchy(this.trees)
        .sum(function(d) { return d.value; })
        .sort(function(a, b) { return b.value - a.value; });
  
  
      const tree = d3.tree()
        .size([width, height - 200]) //设定尺寸
        .separation(function separation(a, b) {
            return (a.parent == b.parent ? 1 : 2) / a.depth;
          }
        )
      
      const tree_data = tree(root)
      
      const nodes = tree_data.descendants()
      let links = tree_data.links()
      
      const g_node = svg.append('g')
        .attr('class', 'nodes')
        
      const node = g_node.selectAll('g')
        .data(nodes)
        .enter()
        .append('g')
        .attr('class', 'node')
      
      
      node.attr("transform", function(d) { return "translate(" + (d.y + 100) + "," + d.x + ")"; })
        .attr('tx', function(d) {return d.y + 100})
        .attr('ty', function(d) {return d.x})
        .attr("r", 4.5)
        .style('fill', 'white')
        .transition()
        .duration(2000)
        .style('fill', 'black')
      
      const node_circle = node.append('circle')
      
      node_circle.attr('class', 'circle')
        .attr('r', 4.5)
  
      const node_text = node.append("text")
        .attr('class', 'text')
  
      node_text.attr("dx", function(d) { return d.children ? -8 : 8 })
        .attr("dy", 3)
        .style("text-anchor", function(d) { return d.children ? "end" : "start" })
        .text(function(d) { return d.data.name })
        .style('fill', 'white')
        .transition()
        .duration(1000)
        .style('fill', 'black')
  
      const g_link = svg.append('g')
        .attr('class', 'links')
      
      const pathConstructor = d3.linkHorizontal()
        .x(function(d) { return d.y })
        .y(function(d) { return d.x });
      
      const link = g_link.selectAll('g')
        .data(links)
        .enter()
        .append('path')
        .attr('class','link')
        .attr("d",function(d){
          console.log(d)
          var start = {x: d.source.x, y: d.source.y + 100};
          var end = {x: d.target.x, y: d.target.y + 100};
          return pathConstructor({source: start, target: end});
        })
      svg.call(d3Zoom())
        svg.on("dblclick.zoom", null);
      
      node.call(d3Drag())
    },
  },
  render() {
    return (
      <div>
        <svg class='mindmap-svg' ref='mountPoint'/>
      </div>
    )
  }
}
