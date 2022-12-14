import state from '../stores/tk-bookmark-store';

async function createLabel(requestData) {
  return await fetch(`${state.bookmarkApi}/label`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestData)
  }).then(res => res.json());
}

async function getLabelIdsFromExistingLabels(existingLabels) {
  let newLabelIds = [];

  let newLabels = await document.querySelector('tk-add-tags').getTags();
  console.log(`size of new labels: ${newLabels.length}`);
  console.log(`size of existing labels: ${existingLabels.length}`);

  //goal is to construct newLabelIds[]
  await Promise.all(newLabels.map(async newLabel => {
    let existingLabel = existingLabels.find(label => label.caption.toLowerCase() === newLabel.caption.toLowerCase());
    if(existingLabel) {
      console.log(`found ${existingLabel.caption} within existing label list`);
      newLabelIds.push(existingLabel._id);
    } else {
      console.log(`found new label: ${newLabel.caption}`);
      let newLabelData = await createLabel({
        caption: newLabel.caption,
        user: state.user.email
      });
      console.log(`>>>> new label data: ${JSON.stringify(newLabelData)}`);
      newLabelIds.push(newLabelData._id);
    }
  }));
  
  console.log(`constructed ids: ${newLabelIds}`);
  return newLabelIds;
}

function convertLabelIdsToLabels(labelIds, existingLabels) {
  let labels = [];
  labelIds.map(labelId => {
    let existingLabel = existingLabels.find(label => label._id === labelId);
    if(existingLabel) {
      labels.push(existingLabel.caption);
    }
  });
  return labels;
}

export {
  convertLabelIdsToLabels,
  getLabelIdsFromExistingLabels
}