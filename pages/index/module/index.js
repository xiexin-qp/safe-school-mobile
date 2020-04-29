import protal from './protal.js'
import visitor from './visitor.js'
import door from './door.js'
import attendance from './attendance.js'
import news from './news.js'
import ncov from './ncov.js'

const moduleList = [
  ...protal,
  ...visitor,
  ...attendance,
  ...ncov,
  ...news
]

export default moduleList