function getIntersection(arr1, arr2) {
  // find out which array is bigger and set that to arr1
  if (arr1.length < arr2.length) {
    const temp = arr1;
    arr1 = arr2;
    arr2 = temp;
  }

  // for every item in arr1, check if that item is also in arr2
  // if it is, add it to output arr
  const intersection = [];
  for (let i = 0; i < arr1.length; i++) {
    const item = arr1[i].songTitle;
    for (let j = 0; j < arr2.length; j++) {
      if (item === arr2[j].songTitle) {
        intersection.push(arr1[i]);
      }
    }
  }

  return intersection;
}

function getNonIntersection(arr, intersection) {
  // return everything in arr that is not in intersection
  const nonIntersection = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i].songTitle;
    let inIntersection = false;
    for (let j = 0; j < intersection.length; i++) {
      if (intersection[j].songTitle === item) {
        inIntersection = true;
        break;
      }
    }
    if (!inIntersection) {
      nonIntersection.append(arr[i]);
    }
  }

  return nonIntersection;
}

function generateReport(producerAssigned, djPlayed) {
  const intersection = getIntersection(producerAssigned, djPlayed);
  const producerAssignedDjNotPlayed = getNonIntersection(
    producerAssigned,
    intersection
  );
  const djPlayedNotAssigned = getNonIntersection(djPlayed, intersection);
  return [producerAssignedDjNotPlayed, intersection, djPlayedNotAssigned];
}

module.exports = { generateReport };
