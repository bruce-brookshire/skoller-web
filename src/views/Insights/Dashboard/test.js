let data = [
  {
    name_first: 'Jon',
    name_last: 'Rankin',
    phone: '1238928574',
    email: 'jon@skoller.co',
    avatar: 'https://thenypost.files.wordpress.com/2020/04/joe-exotic.jpg?quality=80&strip=all&w=618&h=410&crop=1',
    teams: [
      {name: "Men's tennis", id: 1},
      {name: "Men's basketball", id: 2}
    ],
    watching: true
  },
  {
    name_first: 'Bob',
    name_last: 'Boyd',
    phone: '2837491827',
    email: 'bob@skoller.co',
    avatar: 'https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/cache=expiry:max/rotate=deg:exif/resize=width:2400,fit:crop/output=quality:70/compress/https://process.fs.grailed.com/YizdPrQ7TR2ZqA613Q7E',
    teams: [
      {name: "Men's tennis", id: 1},
      {name: "Men's swimming", id: 3}
    ],
    watching: false
  },
  {
    name_first: 'Tina',
    name_last: 'Rina',
    phone: '0001119992',
    email: 'tina@skoller.co',
    avatar: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F20%2F2020%2F04%2F02%2Fjoe-exotic-cr-netflix.jpg',
    teams: [
      {name: "Women's tennis", id: 4}
    ],
    watching: true
  },
  {
    name_first: 'Sara',
    name_last: 'Canada',
    phone: '5647382910',
    email: 'sara@skoller.co',
    avatar: 'https://www.texasmonthly.com/wp-content/uploads/2019/05/EXOTIC_Joe-Exotic-3.jpg',
    teams: [
      {name: "Women's tennis", id: 4},
      {name: 'Track and field', id: 5}
    ],
    watching: false
  },
  {
    name_first: 'Jon',
    name_last: 'Rankin',
    phone: '1238928574',
    email: 'jon@skoller.co',
    avatar: 'https://thenypost.files.wordpress.com/2020/04/joe-exotic.jpg?quality=80&strip=all&w=618&h=410&crop=1',
    teams: [
      {name: "Men's tennis", id: 1},
      {name: "Men's basketball", id: 2}
    ],
    watching: true
  },
  {
    name_first: 'Bob',
    name_last: 'Boyd',
    phone: '2837491827',
    email: 'bob@skoller.co',
    avatar: 'https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/cache=expiry:max/rotate=deg:exif/resize=width:2400,fit:crop/output=quality:70/compress/https://process.fs.grailed.com/YizdPrQ7TR2ZqA613Q7E',
    teams: [
      {name: "Men's tennis", id: 1},
      {name: "Men's swimming", id: 3}
    ],
    watching: false
  },
  {
    name_first: 'Tina',
    name_last: 'Rina',
    phone: '0001119992',
    email: 'tina@skoller.co',
    avatar: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F20%2F2020%2F04%2F02%2Fjoe-exotic-cr-netflix.jpg',
    teams: [
      {name: "Women's tennis", id: 4}
    ],
    watching: true
  },
  {
    name_first: 'Sara',
    name_last: 'Canada',
    phone: '5647382910',
    email: 'sara@skoller.co',
    avatar: 'https://www.texasmonthly.com/wp-content/uploads/2019/05/EXOTIC_Joe-Exotic-3.jpg',
    teams: [
      {name: "Women's tennis", id: 4},
      {name: 'Track and field', id: 5}
    ],
    watching: false
  }
]

let i = 0
let dataWithId = data.map(d => {
  d.id = i
  i += 1
  return d
})

export default dataWithId
