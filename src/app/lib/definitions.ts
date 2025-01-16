  export type User = {
    id: string;          // El ID de usuario como string (probablemente UUID)
    name: string;        // El nombre del usuario
    email: string;       // El correo electrónico del usuario
    password: string;    // La contraseña del usuario (por razones de seguridad, generalmente no se incluye en respuestas API)
    image_url?: string;  // URL de la imagen de perfil (opcional)
  };

  export type Task = {
    id: string;          // El ID de la tarea como string (probablemente UUID)
    title: string;       // El título de la tarea
    description: string; // Descripción de la tarea
    date_start: string;  // Fecha y hora de inicio (representada como string)
    date_end: string;    // Fecha y hora de finalización (representada como string)
    color: string;       // El color de la tarea (puede ser un código hexadecimal o nombre)
    user_id: string;     // El ID del usuario que está asociado a esta tarea (probablemente UUID)
    created_at: string;  // Fecha de creación (representada como string)
    updated_at: string;  // Fecha de actualización (representada como string)
  };
  
  export type LatestUserRaw = Omit<User, 'password'> & {
    id: string;            // UUID del usuario
    name: string;          // Nombre del usuario
    email: string;         // Correo electrónico del usuario
    password: string;      // Aquí asumo que el password está presente, en caso de que lo necesites
  };
  