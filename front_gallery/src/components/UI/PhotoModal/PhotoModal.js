import {Modal, CardMedia} from "@mui/material";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { modalClose } from "../../../store/services/photosSlice";
import apiURL from "../../../config.js";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius:20
};

const PhotoModal = ({show}) => {
    const {modalPhoto} = useSelector(state => state.photos, shallowEqual);
    const cardImage = `${apiURL}/uploads/${modalPhoto}`
    const dispatch = useDispatch();
    const close = () => {
        dispatch(modalClose())
    }
    return (
        <Modal
        open={show}
        onClose={close}
      >
        <CardMedia sx={style} image={cardImage}/>
      </Modal>        
    )
}

export default PhotoModal;