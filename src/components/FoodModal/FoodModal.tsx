import { CircularProgress, Container, CssBaseline, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../helpers/hooks/redux';
import { useCreateFoodMutation, useUpdateFoodMutation } from '../../store/services/apiService';
import { FoodsInfo, setModalFood } from '../../store/slices/foodSlice';
import { IFoodModal } from '../../types/Modal';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function FoodModal({ notify }: IFoodModal) {
  const dispatch = useAppDispatch();
  const { modal, edit, foodsInfo } = useAppSelector((state) => state.food);
  const { categoryId } = useAppSelector((state) => state.category);
  const [image, setImage] = useState<any>();
  const [createFood, { error: createError, isLoading: isLoadingCreate }] = useCreateFoodMutation();
  const [updateFood, { error: updateError, isLoading: isLoadingUpdate }] = useUpdateFoodMutation();
  const [foodValue, setFoodValue] = React.useState<FoodsInfo>({
    id: '',
    name: '',
    description: '',
    price: '',
  });

  const handleClose = () => dispatch(setModalFood(false));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (edit) {
      try {
        const dataBody = {
          avatar: image,
          name: data?.get('name'),
          description: data?.get('description'),
          price: Number(data?.get('price')),
          category: categoryId,
          sale: 0,
        };
        await updateFood({ credentials: dataBody, id: foodsInfo.id });

        if (updateError) {
          notify();
        } else {
          handleClose();
        }
      } catch {
        notify();
      }
    } else {
      try {
        const dataBody = {
          avatar: image,
          name: data?.get('name'),
          description: data?.get('description'),
          price: Number(data.get('price')),
          category: categoryId,
          sale: 0,
        };
        await createFood(dataBody);
        if (createError) {
          notify();
        } else {
          handleClose();
        }
      } catch {
        notify();
      }
    }
  };

  function getBase64(file: any) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setImage(reader?.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  const handleChangeFile = async (event: any) => {
    const file = event.target.files[0];
    getBase64(file);
  };

  React.useLayoutEffect(() => {
    if (edit) {
      setFoodValue(foodsInfo);
    } else {
      setFoodValue({ id: '', name: '', description: '', price: '' });
    }

    return () => {
      setImage('');
    };
  }, [dispatch, edit, foodsInfo]);

  if (isLoadingCreate || isLoadingUpdate) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Modal
      open={modal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={style}>
          <Typography component="h1" variant="h5">
            {edit ? 'Изменить блюдо из меню' : 'Добавить блюдо в меню'}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Button sx={{ backgroundColor: '#1890ff', color: 'white' }} component="label">
              Upload
              <input hidden type="file" onChange={handleChangeFile} />
            </Button>
            <TextField
              margin="normal"
              size="small"
              required
              fullWidth
              id="name"
              label="Название"
              name="name"
              autoFocus
              defaultValue={foodValue.name}
            />
            <TextField
              margin="normal"
              size="small"
              required
              fullWidth
              name="description"
              label="Описание"
              type="string"
              id="description"
              defaultValue={foodValue.description}
            />
            <TextField
              margin="normal"
              size="small"
              required
              fullWidth
              name="price"
              label="Цена"
              type="number"
              id="price"
              defaultValue={foodValue.price}
            />
            <Button
              type="submit"
              fullWidth
              sx={{ mt: 3, mb: 2, backgroundColor: '#1890ff', color: 'white' }}
            >
              {edit ? 'Обнавить' : 'Создать'}
            </Button>
          </Box>
        </Box>
      </Container>
    </Modal>
  );
}
