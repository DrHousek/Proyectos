import { Router, Request, Response, NextFunction } from 'express';
import { check, ValidationChain } from 'express-validator';
import { 
  registrar, 
  login, 
  obtenerUsuarioAutenticado, 
  refreshToken, 
  logout 
} from '../controllers/auth.controller';
import { auth } from '../middlewares/auth.middleware';

// Tipo para manejar controladores asíncronos
type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<Response | void>;

// Helper para manejar errores en controladores asíncronos
const asyncHandler = (fn: AsyncRequestHandler) => 
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

const router = Router();

// @route   POST api/auth/registrar
// @desc    Registrar un nuevo usuario
// @access  Público
const validarRegistro: ValidationChain[] = [
  check('username', 'El nombre de usuario es requerido').not().isEmpty(),
  check('email', 'Por favor incluye un email válido').isEmail(),
  check('password', 'Por favor ingresa una contraseña con 6 o más caracteres').isLength({ min: 6 })
];

router.post('/registrar', validarRegistro, asyncHandler(registrar));

// @route   POST api/auth/login
// @desc    Autenticar usuario y obtener token
// @access  Público
const validarLogin: ValidationChain[] = [
  check('email', 'Por favor incluye un email válido').isEmail(),
  check('password', 'La contraseña es requerida').exists()
];

router.post('/login', validarLogin, asyncHandler(login));

// @route   GET api/auth/usuario
// @desc    Obtener usuario autenticado
// @access  Privado
router.get('/usuario', auth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    await obtenerUsuarioAutenticado(req, res, next);
  } catch (error) {
    next(error);
  }
});

// @route   POST api/auth/refresh-token
// @desc    Obtener un nuevo access token usando el refresh token
// @access  Público
router.post('/refresh-token', asyncHandler(refreshToken));

// @route   POST api/auth/logout
// @desc    Cerrar sesión y eliminar el refresh token
// @access  Privado
router.post('/logout', auth, asyncHandler(logout));

export default router;
