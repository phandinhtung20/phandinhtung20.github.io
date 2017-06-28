const  peer = new Peer({key: 'j7hnti2b5dji3sor'});

const socket= io('https://streamcheck.herokuapp.com/');

function openStream(){
  const config = {audio: false, video: true};
  return navigator.mediaDevices.getUserMedia(config);
}

function playStream(idVideoTag, stream){
  const video= document.getElementById(idVideoTag);
  video.srcObject= stream;
  video.play();
}

// openStream()
// .then(stream =>playStream('localStream', stream));

peer.on('open', function(id){
  $('#yourId').append(id);
  $('#btnSignUp').click(function(){
    var username= $('#ten').val();
    socket.emit('CoNguoiMoi', {user: username, id: id});
  });
})

$('#btnCall').click(function(){
  const id= $('#ten').val();
  openStream()
  .then(function(stream){
    playStream('localStream', stream);
    const call= peer.call(id, stream);
    call.on('stream', function(remoteStream){
      playStream('remoteStream', remoteStream);
    });
  });
});

peer.on('call', function(call){
  openStream()
  .then(
    function(stream){
      call.answer(stream);
      playStream('localStream', stream);
      call.on('stream', function(remoteStream){
        playStream('remoteStream', remoteStream);
      });
    }
  );
});

socket.on('DanhSachOnline', function(data){
  console.log(data);
  data.forEach(function(each){
    var {user , id} = each;
    $('#ulUser').append(`<li id="${id}"> ${user} </li>`);
  });
  socket.on('NguoiMoi', function(data1){
    console.log(data1);
    var {user, id} = data1;
    $('#ulUser').append(`<li id="${id}"> ${user} </li>`);
  });
  socket.on('coNguoiDiNgu', function(data) {
    $(`#${data}`).remove();
    // console.log(data);
  });
});

socket.on('dangKyThatBai', function(data){
  alert('Ten ban dang ky bi trung khop');
});

$('#ulUser').on('click', 'li', function() {
  var peerId= $(this).attr('id');
  openStream()
  .then(function(stream){
    playStream('localStream', stream);
    const call= peer.call(peerId, stream);
    call.on('stream', function(remoteStream){
      playStream('remoteStream', remoteStream);
    });
  });
});
