
const banned = 'POR DIS. MOD. CM. CON UND. FAB. JAVIER'

function getCountDictionary (collection) {
  let resultStr = ''
  let resultArr = []
  collection
    .map((doc) => doc.description)
    .join(' ')
    .split(' ')
    .filter((word) => word.length > 2)
    .filter((word) => banned.indexOf(word) === -1)
    .forEach((word) => {
      if (resultStr.indexOf(word) === -1) {
        resultStr += word + ' '
        resultArr.push({
          count: 1,
          word
        })
      } else {
        resultArr.forEach((entry) => {
          if (entry.word === word) {
            entry.count += 1
          }
        })
      }
    })
  return resultArr
}

function reduceDictionary (dictionary) {
  return dictionary.sort((a, b) => b.count - a.count)
}

module.exports = {
  getCountDictionary,
  reduceDictionary
}
