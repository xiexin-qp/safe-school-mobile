import protal from './protal.js'
import visitor from './visitor.js'
import door from './door.js'
import attendance from './attendance.js'
import news from './news.js'
import ncov from './ncov.js'
import face from './face.js'
import dorm from './dorm.js'
import classStyle from './classStyle.js'
import moral from './moral.js'
import behavior from './behavior.js'
import studentMoral from './studentMoral.js'
import goodsRepair from './goodsRepair.js'
import siteBooking from './siteBooking.js'
import meetBooking from './meetBooking.js'
import studyGround from './studyGround.js'
import activityBooking from './activityBooking.js'
import examPlan from './examPlan.js'
import assistant from './assistant.js'
import transferCourse from './transferCourse.js'
import classCard from './classCard.js'
import safe from './safe.js'
const moduleList = [
  ...protal,
	...safe,
  ...assistant,
  ...visitor,
  ...attendance,
  ...door,
  ...ncov,
  ...news,
  ...face,
  ...dorm,
	...classCard,
  ...classStyle,
  ...moral,
  ...behavior,
  ...studentMoral,
  ...goodsRepair,
  ...siteBooking,
  ...meetBooking,
  ...activityBooking,
  ...studyGround,
  ...examPlan,
  ...transferCourse
]

export default moduleList