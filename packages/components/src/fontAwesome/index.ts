/* import the fontawesome core */
import {library} from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
/* import specific icons */
import {
  faAngleDown,
  faAngleUp,
  faDownload,
  faExpand,
  faLocationDot,
  faMagnifyingGlass,
  faMinimize,
  faL,
  faTrashCan,
  faUsers,
  faUserSecret,
  faUserTie,
  faXmark
} from '@fortawesome/free-solid-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas)
library.add(far)
library.add(fab)
/* add icons to the library */
library.add(faUserSecret, faLocationDot, faUserTie, faUsers, faAngleUp, faAngleDown, fas, faExpand, faMinimize, faXmark, faL, faMagnifyingGlass, faDownload, faTrashCan);
export default library;
