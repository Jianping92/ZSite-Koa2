/**
 * 对key进行转换
 * */
const getDbKey = {
  "allOf": "$all",
  "anyOf": "$or",
  "IN": "$in",
  "NIN": "$nin",
  "EQ": "$eq",
  "NE": "$ne",
  "start": "$gte",
  "end": "$lte"
}

/**
 * 处理请求查询语句
 * 2022-09-13 废弃，不能模仿这种写法
 * */
const getDbQueryCommand = group => {
  if ("allOf" in group && "anyOf" in group) {
    return null;
  }
  // 递归处理key中的搜索关键词
  const recursiveReplacement = data => {
    const objArray = Object.entries(data)[0];
    if (!getDbKey[objArray[0]]) {
      const newData = {};
      newData[objArray[0]] = recursiveReplacement(objArray[1]);
      return newData;
    } else if (getDbKey[objArray[0]] === "$all" || getDbKey[objArray[0]] === "$or") {
      const newData = {};
      const newDataArray = [];
      objArray[1].forEach(item => {
        newDataArray.push(recursiveReplacement(item));
      })
      newData[getDbKey[objArray[0]]] = newDataArray;
      return newData;
    } else {
      const newData = {};
      newData[getDbKey[objArray[0]]] = objArray[1];
      return newData;
    }
  }
  let command = {};
  if ("allOf" in group) {
    command[getDbKey["allOf"]] = [];
    group["allOf"].forEach(item => {
      command[getDbKey["allOf"]].push(recursiveReplacement(item));
    })
  } else if ("anyOf" in group) {
    command[getDbKey["anyOf"]] = [];
    group["anyOf"].forEach(item => {
      command[getDbKey["anyOf"]].push(recursiveReplacement(item));
    })
  }
  return command;
}

/**
 * 处理请求查询语句2
 * */
const getDbQueryCommand2 = group => {
  if (!group) {
    return {};
  }
  let objArray = Object.entries(group);
  objArray = objArray.map(item => {
    let values = Object.entries(item[1]);
    values = values.map(item => {
      let newItem = {};
      if (getDbKey[item[0]]) {
        newItem[getDbKey[item[0]]] = item[1];
      }
      return newItem;
    })
    let newItem = {};
    newItem[item[0]] = Object.assign({}, ...values);
    return values.length ? newItem : null;
  }).filter(Boolean);
  return objArray.length ? Object.assign({}, ...objArray) : {};
}

module.exports = {
  getDbQueryCommand2
}
