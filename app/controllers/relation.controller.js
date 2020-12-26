const PriorityQueue = require("js-priority-queue")
const Relation = require("../models/relation.model")
const Graph = require("../models/graph.model")

const createOrGetRecord =async (a) => {
    const graphing = await Graph.find({})
  
    const nameToId = (graphing[0] ? graphing[0].nameToId:null) || {}
    const idToName = (graphing[0] ? graphing[0].idToName:null) || {}
    const graph = (graphing[0] ? graphing[0].graph:null) || {}
    let next = (graphing[0] ? graphing[0].next:null) || 0
   
    if(nameToId[a] === undefined){
        nameToId[a] = next + 1;
        
        idToName[next + 1] = a;
       

        graph[next + 1] = {"x":"x"}
        
       
        if(!graphing.length){
        await Graph.create({
            nameToId,
            idToName,
            graph,
            next:next+1
        })
        // console.log("creating record 1",nameToId,idToName,graph)
        
    }else{
        await Graph.updateOne({},{
            nameToId,
            idToName,
            graph,
            next:next+1
        })
        // console.log("creating record 1",nameToId,idToName,graph)

    }
    }
    return nameToId[a]
}

const addEdge =async (a,b) => {
    const id_a = await createOrGetRecord(a)
    const id_b =await createOrGetRecord(b)
    const graphing = await Graph.find({})
    const graph = (graphing[0] ? graphing[0].graph:null) || {}
    
    graph[id_a][id_b] = 1
    
    graph[id_b][id_a] = 1;
    
    for(let key in graph){
        delete graph[key].x
    }

    if(graphing[0]){
    await Graph.updateOne({},{
        graph,  
    })
    }else{
        await Graph.create({
            graph
        })
    }

}

const shortestPath =async (a,b) => {
    const graphing = await Graph.find({})
    const nameToId = (graphing[0] ? graphing[0].nameToId:null) || {}
    const idToName = (graphing[0] ? graphing[0].idToName:null) || {}
    const graph = (graphing[0] ? graphing[0].graph:null) || {}
    const id_a = nameToId[a];
    const id_b = nameToId[b];
    

    const dp = {}
    const parent = {}
    dp[id_a] = 0;
    parent[id_a] = -1;
    
    const queue = new PriorityQueue((a,b) => a[1] - b[1]);
    queue.queue([id_a,0])

    //console.log(graph)
    
    while(queue.length > 0){
        const r = queue.dequeue()
        const g = graph[r[0]]
        //console.log(r)
        for(var edge in g){
            if(dp[edge] === undefined || dp[edge] > 1 + r[1]){
                dp[edge] = 1 + r[1]
                parent[edge] = r[0]
                queue.queue([edge,dp[edge]])
            }
        }
    }

    //If no path exist
    if(dp[id_b] == undefined) return undefined

    //Find the path
    const path = []
    let current = id_b;
    path.push(idToName[current])
     

    while(parent[current]!=-1) 
        

        path.push(idToName[current = parent[current]])

    return path.reverse()
}

exports.getRelation = async (req,res) => {
    const relations = await Relation.find({})
    res.json({
        status:true,
        relations:relations
    })
}

exports.addRelation =async (req,res) => {
    const relation = await Relation.create({
        person:req.body.person,
        relationship:req.body.tag,
        secondaryPerson:req.body.secondaryPerson
    })
    addEdge(req.body.person,req.body.secondaryPerson)
    res.json({
        status:true
    })
}

// function lookup(list, from, to) {
//     // find the current "source" 
//     let current = list.find(v => v.person === from);

//     if (!current) // no current?
//         throw new Error("No from in list");

//     // are we there yet?
//     if (current.secondaryPerson === to)
//         return current;

//     // no we're not ... so keep searching with new "source"
//     return [current].concat(find(list, current.secondaryPerson, to));
// }

// exports.getRelationship = async(req,res) => {
//     const relations = await Relation.find({})
//     const relationArray = lookup(relations)
//     const relationString = relationArray.map(each)
// }

exports.getRelationship = async(req,res) => {

   const path =await shortestPath(req.body.person,req.body.secondaryPerson)
   
   res.json({
       status:true,
       path:path
   })
}