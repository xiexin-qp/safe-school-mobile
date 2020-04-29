import protal from './protal.js'
import visitor from './visitor.js'
import door from './door.js'
import attendance from './attendance.js'
import news from './news.js'
import housemaster from './housemaster.js'

const moduleList = [
  ...protal,
  ...visitor,
  ...attendance,
  ...door,
  ...news,
  ...housemaster
]

export default moduleList