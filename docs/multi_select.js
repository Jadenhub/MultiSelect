const lList = [{name: 'item1', id: 1}, {name: 'item2', id: 2}, {name: 'item3', id: 3}, {name: 'item4', id: 4}, {name: 'item5', id: 5}]
const rList = [{name: 'item6', id: 6}, {name: 'item7', id: 7}];

(function IIFE(document){
    const state = {
        lList: lList,
        rList: rList
    }
    const wrapper = document.querySelector('.wrapper');
    const selects = wrapper.querySelectorAll('select');
    const inputs = wrapper.querySelectorAll('input');
    const nums = wrapper.querySelectorAll('.num');

    function fooA(){
        const date = new Date();
        const count = 1000;
        function fooB(count){
            let testB = 0;
            for (let i=0; i< count; i++){
                testB += i+ count;
            }
            // console.log(testB);
        }
        function fooC(){
            let testC = 0;
            for (let i=0; i< count; i++){
                testC += i+ count;
            }
            // console.log(testC);
        }
        const start = window.performance.now();
        for (let i=0; i<count; i++) {
            fooB(count);
        }
        console.log('timespan pass', start, window.performance.now()-start);
        const start2 = window.performance.now();
        for (let i=0; i<count; i++) {
            fooC();
        }
        console.log('timespan', start2, window.performance.now()-start2);
    }
    fooA()



    function init(selects, nums, props){
        console.log(selects);
        console.log(props);
        console.log(nums);
        function setOptions(select, opts){
            const fragment = document.createDocumentFragment();
            opts.forEach(opt => {
                const ele = document.createElement('option');
                ele.value = opt.id;
                ele.textContent = opt.name;
                fragment.appendChild(ele);
            });
            select.appendChild(fragment);
        }
        setOptions(selects[0], props.lList);
        setOptions(selects[1], props.rList);

        function setCount(num, value){
            num.textContent = value;
        }
        setCount(nums[0], props.lList.length);
        setCount(nums[1], props.lList.length);
        setCount(nums[2], props.rList.length);
        setCount(nums[3], props.rList.length);
    }
    init(selects, nums, state);

    function  handleInputKeyup(element, list, evt){
        console.log(element);
        console.log(list);
    }
    const handleLInputKeyup = handleInputKeyup.bind(null, {
        select: selects[0],
        totalCount: nums[0],
        searchCount: nums[1]
    }, state.lList);
    const handleRInputKeyup = handleInputKeyup.bind(null, {
        select: selects[1],
        totalCount: nums[2],
        searchCount: num[3]
    }, state.rList);
    inputs[0].addEventListener('keyup', handleLInputKeyup);
    inputs[1].addEventListener('keyup', handleRInputKeyup);



    // function listen(selects, inputs, nums, state){
    //     function search(input){
    //         //const pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？+]");
    //         input.addEventListener('keyup', handleLInputKeyup);
    //     }
    //     search(inputs[0]);
    //     search(inputs[1]);
    // }
    // listen(selects, inputs, nums, state);
    // function unListen(selects, inputs){

    // }
})(document);