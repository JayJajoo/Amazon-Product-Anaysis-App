import React,{useState,useEffect,useRef} from 'react'
import * as d3 from 'd3';

const Sociogram = ({data}) => {
  const svgRef = useRef();
  const [isLinksSet,setIsLinksSet] = useState(false);
  const [isNodesSet , setIsNodesSet] = useState(false)
  const [isDataSet , setIsDataSet] = useState(false)

  const [links,setLinks]=useState([
        { source: 'Product', target: 'Positive Reviews', value: 1 },
        { source: 'Product', target: 'Negative Reviews', value: -1 }
    ])

  const [nodes,setNodes ]= useState([
        { id: 'Product', group: 1 },
        { id: 'Positive Reviews', group: 2 },
        { id: 'Negative Reviews', group: 3 }
  ])

  useEffect(()=>{
    if(isLinksSet && isNodesSet){
      setIsDataSet(true)
    }
  },[])

  useEffect(()=>{
    if(data && !isDataSet ){
        for(let i=0;i<data.length;i++){
            setNodes(nodes =>[...nodes,{
                id:`User ${i+1}`,
                group:4
            }])
        }
      setIsNodesSet(true);
      for(let i=0;i<data.length;i++){
          setLinks(links=>[...links,{
          source: data[i].review == "Negative" ? "Negative Reviews" : "Positive Reviews",
          target:`User ${i+1}`,
          value : data[i].review == "Negative" ? -1 : 1 
          }])
      }
      setIsLinksSet(true);
    }
  },[data])

  useEffect(()=>{
    if(isLinksSet){
      console.table(links)
    }
  },[isLinksSet])

  useEffect(()=>{
    if(isNodesSet){
      console.table(nodes)
    }
  },[isNodesSet])


  const makeGraph=()=>{
    const svg = d3.select(svgRef.current)
            .attr('width', 600)
            .attr('height',400);
      
          const color = d3.scaleOrdinal(d3.schemeCategory10);
      
          const simulation = d3.forceSimulation()
            .force('link', d3.forceLink().id(d => d.id).distance(200))
            .force('charge', d3.forceManyBody())
            .force('center', d3.forceCenter(300, 200));
      
          const link = svg.append('g')
            .attr('class', 'links')
            .selectAll('line')
            .data(links)
            .enter()
            .append('line')
            .attr('stroke-width', d => Math.abs(d.value))
            .attr('stroke', d => d.value > 0 ? 'green' : 'red');
      
          const node = svg.append('g')
            .attr('class', 'nodes')
            .selectAll('circle')
            .data(nodes)
            .enter()
            .append('circle')
            .attr('r', 15)
            .attr('fill', d => color(d.group));
      
          node.append('title')
            .text(d => d.id);
      
          const text = svg.append('g')
            .attr('class', 'texts')
            .selectAll('text')
            .data(nodes)
            .enter()
            .append('text')
            .text(d => d.id)
            .attr('font-size', 12)
            .attr('dx', 15)
            .attr('dy', 4);
      
          const ticked = () => {
            link
              .attr('x1', d => d.source.x)
              .attr('y1', d => d.source.y)
              .attr('x2', d => d.target.x)
              .attr('y2', d => d.target.y);
      
            node
              .attr('cx', d => d.x)
              .attr('cy', d => d.y);
      
            text
              .attr('x', d => d.x)
              .attr('y', d => d.y);
          };
      
          simulation.nodes(nodes)
            .on('tick', ticked);
      
          simulation.force('link')
            .links(links);
      
          return () => {
            svg.selectAll('*').remove();
          };
  }

  useEffect(() => {
    if(isLinksSet && isNodesSet){
          makeGraph()
          console.log(isLinksSet)
          console.log(isNodesSet)
    }
  }, [isLinksSet,isNodesSet]);

  return (
    <svg ref={svgRef}></svg>
  );
};

export default Sociogram;