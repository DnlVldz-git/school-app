import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import dayOfYear from "dayjs/plugin/dayOfYear";
import relativeTime from "dayjs/plugin/relativeTime";
import isBetween from "dayjs/plugin/isBetween";
import customParseFormat from "dayjs/plugin/customParseFormat";

import "dayjs/locale/es";

dayjs.extend(dayOfYear);
dayjs.extend(isToday);
dayjs.extend(weekOfYear);
dayjs.extend(relativeTime);
dayjs.extend(isBetween);
dayjs.extend(customParseFormat);

dayjs.locale("es");

export default dayjs;
