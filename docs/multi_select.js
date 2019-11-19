(function IIFE(document){
  const dataSource = {
    lList: [{name: 'item1', id: 1}, {name: 'item2', id: 2}, {name: 'item3', id: 3}, {name: 'item4', id: 4}, {name: 'item5', id: 5}],
    rList: [{name: 'item6', id: 6}, {name: 'item7', id: 7}]
  }
  let state = {};
  function setDefaultState(data){
    state.lList =data.lList.slice();
    state.rList = data.rList.slice();
    state.lListFiltered = data.lList.slice();
    state.rListFiltered = data.rList.slice();
  }
  setDefaultState(dataSource);
  const item1 = document.querySelector('.wrapper > .item');
  const selects = item1.querySelectorAll('select');
  const nums = item1.querySelectorAll('.num');
  const inputs = document.querySelectorAll('input');
  function setOptions(select, opts){
    const fragment = document.createDocumentFragment();
    opts.forEach(opt => {
        const ele = document.createElement('option');
        ele.value = opt.id;
        ele.selected = opt.selected;
        ele.textContent = opt.name;
        if (opt.isNew) {
          ele.className = 'new';
        }
        fragment.appendChild(ele);
    });
    select.appendChild(fragment);
  }
  function removeOptions(select){
    for(let i = select.options.length - 1 ; i >= 0 ; i--){
      select.remove(i);
    }
  }
  function init(selects, nums, props){
      removeOptions(selects[0]);
      removeOptions(selects[1]);
      setOptions(selects[0], props.lListFiltered);
      setOptions(selects[1], props.rListFiltered);

      function setCount(num, value){
          num.textContent = value;
      }
      setCount(nums[0], props.lList.length);
      setCount(nums[1], props.lListFiltered.length);
      setCount(nums[2], props.rList.length);
      setCount(nums[3], props.rListFiltered.length);
  }
  function findMatches(str, options) {
    const pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？+]");
    let rs = "";
    for (let i = 0; i < str.length; i++) {
      //specific symbol add /
      rs = rs + str.substr(i, 1).replace(pattern, '\\' + `${str.substr(i, 1)}`);
    }
    const regex = new RegExp(rs, 'gi');
    return options.filter(opt => {
      return opt.name.match(regex);
    });
  }
  const handleLInputKeyup = function(evt) {
    removeOptions(selects[0])
    state.lListFiltered = findMatches(this.value, state.lList); 
    setOptions(selects[0], state.lListFiltered);
    nums[1].textContent = state.lListFiltered.length;
  }
  const handleRInputKeyup = function (evt) {
    removeOptions(selects[1])
    state.rListFiltered = findMatches(this.value, state.rList); 
    setOptions(selects[1], state.rListFiltered);
    nums[3].textContent = state.rListFiltered.length;
  }
  function getOptionsValue(options){
    const selectedArray = [];
    for (let i=0; i< options.length; i++) {
      selectedArray.push(options[i].value);
    }
    return selectedArray;
  }
  function findIndexInArray(data, property, value) {
    for (let i = 0, l = data.length; i < l; i++) {
      if (data[i][property] === value) {
        return i;
      }
    }
    return -1;
  }
  const handleLSelectChange = (evt)=>{
    const selectedArray = getOptionsValue(evt.target.selectedOptions);
    if (state.lList.length !== state.lListFiltered.length) {
      state.lListFiltered.forEach(opt => {
        const idx = findIndexInArray(state.lList, 'id', opt.id);
        if (selectedArray.indexOf(opt.value) !== -1) {
          opt.selected = true;
          state.lList[idx].selected = true;
        } else {
          opt.selected = false;
          state.lList[idx].selected = false;
        }
      }); 
    } else {
      state.lList.forEach((opt, idx)=>{
        if (selectedArray.indexOf(opt.id.toString()) !== -1) {
          opt.selected = true;
          state.lList[idx].selected = true;
        } else {
          opt.selected = false;
          state.lList[idx].selected = false;
        }
      });
    }
  }
  const handleRSelectChange = (evt) =>{
    const selectedArray = getOptionsValue(evt.target.selectedOptions);
    if (state.rList.length !== state.rListFiltered.length) {
      state.rListFiltered.forEach(opt => {
        const idx = findIndexInArray(state.rList, 'id', opt.id);
        if (selectedArray.indexOf(opt.value) !== -1) {
          opt.selected = true;
          state.rList[idx].selected = true;
        } else {
          opt.selected = false;
          state.rList[idx].selected = false;
        }
      }); 
    } else {
      state.rList.forEach((opt, idx)=>{
        if (selectedArray.indexOf(opt.id.toString()) !== -1) {
          opt.selected = true;
          state.rList[idx].selected = true;
        } else {
          opt.selected = false;
          state.rList[idx].selected = false;
        }
      });
    }
  }
  function allToRight(){
    let list = state.lList.slice();
    const filteredList = state.lListFiltered.slice();
    if (filteredList.length === 0) {
      alert('Nothing moved');
      return;
    }
    state.lListFiltered.length = 0;
    filteredList.forEach(opt => {
      if(findIndexInArray(dataSource.rList, 'id', opt.id) === -1) {
        opt.isNew = true;
      } else {
        opt.isNew = false;
      }
    });
    state.rList = state.rList.concat(filteredList).sort((a, b)=>{
      var x = a.name.toLowerCase();
      var y = b.name.toLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
    });
    if (list.length === filteredList.length) {
      state.lList.length = 0;
    } else {
      list = list.filter(opt => findIndexInArray(filteredList, 'id', opt.id) === -1);
      state.lList =list;
    }
    inputs[5].dispatchEvent(new Event('keyup'));
    init(selects, nums, state);
  }
  function allToLeft(){
    let list = state.rList.slice();
    const filteredList = state.rListFiltered.slice();
    if (filteredList.length === 0) {
      alert('Nothing moved');
      return;
    }
    filteredList.forEach(opt => {
      if(findIndexInArray(dataSource.lList, 'id', opt.id) === -1) {
        opt.isNew = true;
      } else {
        opt.isNew = false;
      }
    });
    state.rListFiltered.length = 0;
    state.lList = state.lList.concat(filteredList).sort((a, b)=>{
      var x = a.name.toLowerCase();
      var y = b.name.toLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
    });
    if (list.length === filteredList.length) {
      state.rList.length = 0;
    } else {
      list = list.filter(opt => findIndexInArray(filteredList, 'id', opt.id) === -1);
      state.rList =list;
    }
    inputs[0].dispatchEvent(new Event('keyup'));
    init(selects, nums, state);
  }
  function toRight(){
    const list = state.lList.slice();
    const filteredList = state.lListFiltered.slice();
    const selected = filteredList.filter(opt => opt.selected)
    if (selected.length === 0){
      alert('Nothing Selected');
      return;
    }
    selected.forEach(opt => {
      if(findIndexInArray(dataSource.rList, 'id', opt.id) === -1) {
        opt.isNew = true;
      } else {
        opt.isNew = false;
      }
    });
    state.rList = state.rList.concat(selected).sort((a, b)=>{
      var x = a.name.toLowerCase();
      var y = b.name.toLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
    })
    state.lList = list.filter(opt => findIndexInArray(selected, 'id', opt.id) === -1)
    state.lListFiltered = filteredList.filter(opt => !opt.selected);
    inputs[5].dispatchEvent(new Event('keyup'));
    init(selects, nums, state);
  }
  function toLeft(){
    const list = state.rList.slice();
    const filteredList = state.rListFiltered.slice();
    const selected = filteredList.filter(opt => opt.selected)
    if (selected.length === 0){
      alert('Nothing Selected');
      return;
    }
    selected.forEach(opt => {
      if(findIndexInArray(dataSource.lList, 'id', opt.id) === -1) {
        opt.isNew = true;
      } else {
        opt.isNew = false;
      }
    });
    state.lList = state.lList.concat(selected).sort((a, b)=>{
      var x = a.name.toLowerCase();
      var y = b.name.toLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
    })
    state.rList = list.filter(opt => findIndexInArray(selected, 'id', opt.id) === -1)
    state.rListFiltered = filteredList.filter(opt => !opt.selected);
    inputs[0].dispatchEvent(new Event('keyup'));
    init(selects, nums, state);
  }
  function handleSubmit(){
    const lList = state.lList.slice();
    const rList = state.rList.slice();
    function toDefault(options){
      options.forEach(opt => {
        opt.selected = false;
        opt.isNew = false
      });
    }
    toDefault(lList);
    toDefault(rList);
    dataSource.lList = lList;
    dataSource.rList = rList;
    setDefaultState(dataSource);
    inputs[0].value='';
    inputs[5].value='';
    init(selects, nums, state);
    alert('Setup successfully.')
  }
  function listen(){
    inputs[0].addEventListener('keyup', handleLInputKeyup, false);
    inputs[1].addEventListener('click', allToRight, false);
    inputs[2].addEventListener('click', toRight, false);
    inputs[3].addEventListener('click', toLeft, false);
    inputs[4].addEventListener('click', allToLeft, false);
    inputs[5].addEventListener('keyup', handleRInputKeyup, false);
    inputs[6].addEventListener('click', handleSubmit, false);
    selects[0].addEventListener('change', handleLSelectChange, false);
    selects[1].addEventListener('change', handleRSelectChange, false);
  }
  init(selects, nums, state);
  listen();
  function unListen(){
    inputs[0].removeEventListener('keyup', handleLInputKeyup, false);
    inputs[1].removeEventListener('click', allToRight, false);
    inputs[2].removeEventListener('click', toRight, false);
    inputs[3].removeEventListener('click', toLeft, false);
    inputs[4].removeEventListener('click', allToLeft, false);
    inputs[5].removeEventListener('keyup', handleRInputKeyup, false);
    inputs[6].addEventListener('click', handleSubmit, false);
    selects[0].removeEventListener('change', handleLSelectChange, false);
    selects[1].removeEventListener('change', handleRSelectChange, false);
  }
})(document);