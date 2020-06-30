
var query = function() {
    resData = [],
    resColumns = function(e){return e}
    clauseCounts = {FROM: 0, SELECT: 0}

    select = function(func) {
        clauseCounter('SELECT')
        resColumns = typeof func == "function" ? func : function(e){return e}
        return this
    },

    from = function(input) {
        clauseCounter('FROM')
        resData = input
        return this
    },

    where = function(func) {
        resData = resData.filter(e => func(e));
        return this
    },
    
    groupBy = function(func) {
        //resData = [...new Set(resData.map(e => func(e)))].map(e => [e, resData.filter(ee => func(ee) == e)]);
        resData = [...new Set(resData.map(e => func(e)))].map(e => [e, resData.filter(ee => func(ee) == e)]);
        return this
    },

    execute = function() {
        clauseCounts = {FROM: 0, SELECT: 0}
        return resData.map(e => resColumns(e))
    }

    clauseCounter = function(clause){
        if(clauseCounts[clause] != 0){
            throw 'Duplicate ' + clause
        }else{
            clauseCounts[clause]++
        }  
    }

    return this
};

function resultColumns(data) {
    //return data.name;
    return {name: data.name, profession: data.profession, nationality: data.nationality};
}

function resultRows(data) {
    return data.profession === 'teacher';
    //return {name: data.name, profession: data.profession, nationality: data.nationality};
}

var persons = [
    {name: 'Peter', profession: 'teacher', age: 1, maritalStatus: 'married'},
    {name: 'Michael', profession: 'teacher', age: 50, maritalStatus: 'single'},
    {name: 'Peter', profession: 'teacher', age: 6, maritalStatus: 'married'},
    {name: 'Anna', profession: 'scientific', age: 20, maritalStatus: 'married'},
    {name: 'Rose', profession: 'scientific', age: 50, maritalStatus: 'married'},
    {name: 'Anna', profession: 'scientific', age: 4, maritalStatus: 'single'},
    {name: 'Anna', profession: 'politician', age: 50, maritalStatus: 'married'}
  ]

var numbers = [1, 2, 3]; 

//console.log(query().select(resultColumns).from(persons).execute())

//console.log(query().select().from(persons).execute())

//console.log(query().select().from(numbers).execute())

//console.log(query().select(resultColumns).from(persons).execute())

console.log(query().select(resultColumns).from(persons).where(resultRows).execute())