# Things we still need to do

- After clicking OPEN ORDER, if the user hard refreshes, the order will stay claimed and will not be accessible. We tried using `useBeforeunload` from `react-beforeunload` but that caused problems when we had to do a window.location.reload() when you click on OPEN ORDER but the order is already claimed. We want the order released on reload, back button and browser close
