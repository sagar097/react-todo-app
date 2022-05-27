// A mock function to mimic making an async request for data
export function fetchTask(params) {
  return new Promise((resolve) =>
    setTimeout(() => resolve({
      data: [
        {
          id: Math.random(),
          data: { name: 'day', discription: 'task of promise' }
        },
        {
          id: Math.random(),
          data: { name: 'day1', discription: 'task of promise2' }
        }
      ]
    })
      , 500)
  );
}
