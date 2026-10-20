-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 20-10-2026 a las 18:57:46
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `hospital_clinicas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ambulancias`
--

CREATE TABLE `ambulancias` (
  `id_ambulancia` int(11) NOT NULL,
  `matricula` varchar(20) NOT NULL,
  `marca` varchar(50) DEFAULT NULL,
  `modelo` varchar(50) DEFAULT NULL,
  `ano` varchar(255) DEFAULT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `capacidad` int(11) DEFAULT NULL,
  `fecha_ultimo_mantenimiento` date DEFAULT NULL,
  `activo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ambulancias`
--

INSERT INTO `ambulancias` (`id_ambulancia`, `matricula`, `marca`, `modelo`, `ano`, `tipo`, `capacidad`, `fecha_ultimo_mantenimiento`, `activo`) VALUES
(1, 'hrc 456', 'quiee', 'suburban', '2026', 'uti_movil', 34, '2026-07-03', 1),
(2, 'IAJ', 'Guasibura', 'Paquete', '2020', 'medicalizada', 2303, '2026-07-02', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias_documentos`
--

CREATE TABLE `categorias_documentos` (
  `id_categoria` int(11) NOT NULL,
  `nombre_categoria` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `activo` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `conductores`
--

CREATE TABLE `conductores` (
  `id_conductor` int(11) NOT NULL,
  `documento` varchar(20) NOT NULL,
  `nombre_completo` varchar(200) NOT NULL,
  `licencia` varchar(20) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `fecha_contratacion` date DEFAULT NULL,
  `activo` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `conductores`
--

INSERT INTO `conductores` (`id_conductor`, `documento`, `nombre_completo`, `licencia`, `telefono`, `email`, `fecha_contratacion`, `activo`) VALUES
(1, '45816856', 'matstst', 'A', '9789869876', 'hgdhgdhd?K@gmail.com', '2026-10-08', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `copilotos`
--

CREATE TABLE `copilotos` (
  `id_copiloto` int(11) NOT NULL,
  `documento` varchar(20) NOT NULL,
  `nombre_completo` varchar(200) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `fecha_contratacion` date DEFAULT NULL,
  `activo` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `copilotos`
--

INSERT INTO `copilotos` (`id_copiloto`, `documento`, `nombre_completo`, `telefono`, `email`, `fecha_contratacion`, `activo`) VALUES
(1, '3454555', 'jaime tolonga', '0989898', 'aaaaaaa@gmail.com', '2026-10-22', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalles_respuestas`
--

CREATE TABLE `detalles_respuestas` (
  `id_detalle` int(11) NOT NULL,
  `id_respuesta` int(11) DEFAULT NULL,
  `id_pregunta` int(11) DEFAULT NULL,
  `id_opcion` int(11) DEFAULT NULL,
  `respuesta_texto` text DEFAULT NULL,
  `valor_escala` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `documentos`
--

CREATE TABLE `documentos` (
  `id_documento` int(11) NOT NULL,
  `titulo` varchar(200) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `archivo_nombre` varchar(255) NOT NULL,
  `archivo_ruta` varchar(500) NOT NULL,
  `id_categoria` int(11) DEFAULT NULL,
  `fecha_publicacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `activo` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `documentos`
--

INSERT INTO `documentos` (`id_documento`, `titulo`, `descripcion`, `archivo_nombre`, `archivo_ruta`, `id_categoria`, `fecha_publicacion`, `activo`) VALUES
(1, '6a9af8b858910.png', NULL, 'asd', '/HR_Clinica/documentos/6a9af8b858910.png', NULL, '2026-09-04 16:58:32', 1),
(2, '6a9af941dc76d.pdf', NULL, 'Jorge', '/HR_Clinica/documentos/6a9af941dc76d.pdf', NULL, '2026-09-04 17:00:49', 1),
(3, '6a9af97e6f382.png', NULL, 'sd', '/HR_Clinica/documentos/6a9af97e6f382.png', NULL, '2026-09-04 17:01:50', 1),
(4, '6a9af9b4cd02d.png', NULL, 'terr', '/HR_Clinica/documentos/6a9af9b4cd02d.png', NULL, '2026-09-04 17:02:44', 1),
(5, '6a9b19ea7b58e.png', NULL, 'Direccion', '/HR_Clinica/documentos/6a9b19ea7b58e.png', NULL, '2026-09-04 19:20:10', 1),
(6, '6a9f6f3d840d6.png', NULL, 'Documento JS', '/HR_Clinica/documentos/6a9f6f3d840d6.png', NULL, '2026-09-08 02:13:17', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `documentos_pacientes`
--

CREATE TABLE `documentos_pacientes` (
  `id_acceso` int(11) NOT NULL,
  `id_paciente` int(11) DEFAULT NULL,
  `id_documento` int(11) DEFAULT NULL,
  `codigo_qr` varchar(100) NOT NULL,
  `fecha_acceso` timestamp NOT NULL DEFAULT current_timestamp(),
  `ip_acceso` varchar(45) DEFAULT NULL,
  `dispositivo` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `elementos_traslado`
--

CREATE TABLE `elementos_traslado` (
  `id_elemento` int(11) NOT NULL,
  `id_tipo_traslado` int(11) DEFAULT NULL,
  `nombre` varchar(200) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `requiere_condicion_especial` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `elementos_traslado`
--

INSERT INTO `elementos_traslado` (`id_elemento`, `id_tipo_traslado`, `nombre`, `descripcion`, `requiere_condicion_especial`) VALUES
(3, 2, 'asdas', 'asdasd', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `encuestas`
--

CREATE TABLE `encuestas` (
  `id_encuesta` int(11) NOT NULL,
  `titulo` varchar(200) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `activo` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_traslados`
--

CREATE TABLE `historial_traslados` (
  `id_historial` int(11) NOT NULL,
  `id_solicitud` int(11) DEFAULT NULL,
  `fecha_inicio` datetime NOT NULL,
  `fecha_fin` datetime DEFAULT NULL,
  `distancia_recorrida_km` decimal(10,2) DEFAULT NULL,
  `tiempo_total_min` int(11) DEFAULT NULL,
  `incidencias` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `opciones_respuesta`
--

CREATE TABLE `opciones_respuesta` (
  `id_opcion` int(11) NOT NULL,
  `id_pregunta` int(11) DEFAULT NULL,
  `texto_opcion` varchar(255) NOT NULL,
  `valor_opcion` int(11) DEFAULT NULL,
  `orden` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacientes`
--

CREATE TABLE `pacientes` (
  `id_paciente` int(11) NOT NULL,
  `documento` varchar(20) NOT NULL,
  `nombre_completo` varchar(200) NOT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp(),
  `activo` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacientes_traslado`
--

CREATE TABLE `pacientes_traslado` (
  `id_paciente_traslado` int(11) NOT NULL,
  `id_elemento` int(11) DEFAULT NULL,
  `id_paciente` int(11) DEFAULT NULL,
  `diagnostico` text DEFAULT NULL,
  `requiere_oxigeno` tinyint(1) DEFAULT 0,
  `requiere_monitoreo` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preguntas`
--

CREATE TABLE `preguntas` (
  `id_pregunta` int(11) NOT NULL,
  `id_encuesta` int(11) DEFAULT NULL,
  `texto_pregunta` text NOT NULL,
  `tipo_respuesta` enum('texto','opcion_multiple','escala','si_no') NOT NULL,
  `orden` int(11) DEFAULT 0,
  `obligatoria` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuestas_encuestas`
--

CREATE TABLE `respuestas_encuestas` (
  `id_respuesta` int(11) NOT NULL,
  `id_paciente` int(11) DEFAULT NULL,
  `id_encuesta` int(11) DEFAULT NULL,
  `fecha_respuesta` timestamp NOT NULL DEFAULT current_timestamp(),
  `ip_respuesta` varchar(45) DEFAULT NULL,
  `completada` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rutas`
--

CREATE TABLE `rutas` (
  `id_ruta` int(11) NOT NULL,
  `nombre_ruta` varchar(100) NOT NULL,
  `origen` varchar(200) NOT NULL,
  `destino` varchar(200) NOT NULL,
  `distancia_km` decimal(10,2) DEFAULT NULL,
  `tiempo_estimado_min` int(11) DEFAULT NULL,
  `activo` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `seguimiento_traslados`
--

CREATE TABLE `seguimiento_traslados` (
  `id_seguimiento` int(11) NOT NULL,
  `id_solicitud` int(11) DEFAULT NULL,
  `fecha_hora` timestamp NOT NULL DEFAULT current_timestamp(),
  `latitud` varchar(20) DEFAULT NULL,
  `longitud` varchar(20) DEFAULT NULL,
  `estado_actual` enum('salida','en_ruta','llegada','retorno','finalizado') NOT NULL,
  `observaciones` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudes_traslado`
--

CREATE TABLE `solicitudes_traslado` (
  `id_solicitud` int(11) NOT NULL,
  `id_conductor` int(11) DEFAULT NULL,
  `id_copiloto` int(11) DEFAULT NULL,
  `id_ambulancia` int(11) DEFAULT NULL,
  `id_ruta` int(11) DEFAULT NULL,
  `id_elemento` int(11) DEFAULT NULL,
  `fecha_solicitud` timestamp NOT NULL DEFAULT current_timestamp(),
  `hora_salida` datetime NOT NULL,
  `hora_llegada_estimada` datetime DEFAULT NULL,
  `hora_llegada_efectiva` datetime DEFAULT NULL,
  `estado` enum('programado','en_curso','llegado','retornado','cancelado') DEFAULT 'programado',
  `observaciones` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipos_traslado`
--

CREATE TABLE `tipos_traslado` (
  `id_tipo_traslado` int(11) NOT NULL,
  `nombre_tipo` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `requiere_equipo_especial` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipos_traslado`
--

INSERT INTO `tipos_traslado` (`id_tipo_traslado`, `nombre_tipo`, `descripcion`, `requiere_equipo_especial`) VALUES
(1, 'ados', 'asdasd', 0),
(2, 'zdcxacx', 'sadcdsa', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios_sistema`
--

CREATE TABLE `usuarios_sistema` (
  `id_usuario` int(11) NOT NULL,
  `nombre_usuario` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `nombre_completo` varchar(200) NOT NULL,
  `email` varchar(100) NOT NULL,
  `rol` enum('administrador','funcionario','supervisor') DEFAULT 'funcionario',
  `id_empleado` varchar(20) DEFAULT NULL,
  `activo` tinyint(1) DEFAULT 1,
  `ultimo_acceso` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios_sistema`
--

INSERT INTO `usuarios_sistema` (`id_usuario`, `nombre_usuario`, `password_hash`, `nombre_completo`, `email`, `rol`, `id_empleado`, `activo`, `ultimo_acceso`) VALUES
(1, 'zx', 'as', 'as', 'alejandro@gmail.com', 'administrador', '4545', 1, '2026-08-21 03:16:36'),
(2, 'a', 'a', 'a', 'alekarbonell@gmail.com', 'administrador', '34', 1, '2026-08-21 12:45:27'),
(4, 'alejandro', 'alejandro', 'luis alejandro', 'quie@gmail.com', 'administrador', '234', 1, '2026-08-23 02:25:09'),
(5, 'luis', 'luis', 'luis alejandro', 'luis@gmail.com', 'administrador', '44', 1, '2026-08-23 02:28:21'),
(6, 'tres', 'tres', 'tres', 'tres@gmail.com', 'administrador', '45345', 1, '2026-08-23 02:30:41'),
(7, 'alell', 'ale', 'ale', 'alell@gmail.com', 'administrador', '34', 1, '2026-08-23 02:34:36'),
(8, 'att', 'att', 'att', 'att@gmail.com', 'administrador', '34', 1, '2026-08-23 02:40:56'),
(9, 'moonkar', 'moonkar', 'luis alejandro', 'moonkar@gmail.com', 'administrador', '566', 1, '2026-08-24 01:59:11'),
(10, 'Terracota', '$2y$10$EY22J7nrOs0pUVa5zqvmve7aaHaXbbPuKlgIuCUuE/nruadVAUdD6', 'terracota', 'terracota@gmail.com', 'administrador', '455656', 1, '2026-08-24 02:00:46'),
(11, 'guason', '$2y$10$5H9T/3lOXkAmwmWZMziikukeBQoFXM9vRuiQGWEoJRxNNRsPWaA/S', 'guason guason', 'guason@gmail.com', 'administrador', '345345', 1, '2026-08-24 02:36:55'),
(12, 'aja', '$2y$10$iJJWGqM1ZevMYYdYaqKb4.LK/YaOryquClmg5oKBo9tVfwr1AdLX.', 'aja', 'aja@gmail.com', 'administrador', '345', 1, '2026-09-01 03:11:13'),
(13, 'rooster', '$2y$10$8ecQnqw9GOUMUAacHPeFtukhmVWdbEn1tp5cy/DqxpKfI0s4OjFi.', 'rooster', 'rooster@gmail.com', 'administrador', '45', 1, '2026-09-02 20:57:26'),
(14, 'Enzo', '$2y$10$Gr3.LfrDflFfNwDYGUwzjO1JndzFHsZa8r0X6taE.FNQU6tKEdQpq', 'enzo', 'enxo@gmail.com', 'administrador', '87897986', 1, '2026-09-04 19:18:37'),
(15, 'admin', '$2y$10$R6YHuY0SjcxROUKbzU2QC./SJ9qClOsn4P1qGhoUzm5OdLz7olma6', 'Admin Admin', 'admin@gmail.com', 'administrador', '334', 1, '2026-09-09 02:11:16');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ambulancias`
--
ALTER TABLE `ambulancias`
  ADD PRIMARY KEY (`id_ambulancia`),
  ADD UNIQUE KEY `matricula` (`matricula`);

--
-- Indices de la tabla `categorias_documentos`
--
ALTER TABLE `categorias_documentos`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `conductores`
--
ALTER TABLE `conductores`
  ADD PRIMARY KEY (`id_conductor`),
  ADD UNIQUE KEY `documento` (`documento`);

--
-- Indices de la tabla `copilotos`
--
ALTER TABLE `copilotos`
  ADD PRIMARY KEY (`id_copiloto`),
  ADD UNIQUE KEY `documento` (`documento`);

--
-- Indices de la tabla `detalles_respuestas`
--
ALTER TABLE `detalles_respuestas`
  ADD PRIMARY KEY (`id_detalle`),
  ADD KEY `id_respuesta` (`id_respuesta`),
  ADD KEY `id_pregunta` (`id_pregunta`),
  ADD KEY `id_opcion` (`id_opcion`);

--
-- Indices de la tabla `documentos`
--
ALTER TABLE `documentos`
  ADD PRIMARY KEY (`id_documento`),
  ADD KEY `id_categoria` (`id_categoria`);

--
-- Indices de la tabla `documentos_pacientes`
--
ALTER TABLE `documentos_pacientes`
  ADD PRIMARY KEY (`id_acceso`),
  ADD UNIQUE KEY `codigo_qr` (`codigo_qr`),
  ADD KEY `id_paciente` (`id_paciente`),
  ADD KEY `id_documento` (`id_documento`);

--
-- Indices de la tabla `elementos_traslado`
--
ALTER TABLE `elementos_traslado`
  ADD PRIMARY KEY (`id_elemento`),
  ADD KEY `id_tipo_traslado` (`id_tipo_traslado`);

--
-- Indices de la tabla `encuestas`
--
ALTER TABLE `encuestas`
  ADD PRIMARY KEY (`id_encuesta`);

--
-- Indices de la tabla `historial_traslados`
--
ALTER TABLE `historial_traslados`
  ADD PRIMARY KEY (`id_historial`),
  ADD KEY `id_solicitud` (`id_solicitud`);

--
-- Indices de la tabla `opciones_respuesta`
--
ALTER TABLE `opciones_respuesta`
  ADD PRIMARY KEY (`id_opcion`),
  ADD KEY `id_pregunta` (`id_pregunta`);

--
-- Indices de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`id_paciente`),
  ADD UNIQUE KEY `documento` (`documento`);

--
-- Indices de la tabla `pacientes_traslado`
--
ALTER TABLE `pacientes_traslado`
  ADD PRIMARY KEY (`id_paciente_traslado`),
  ADD KEY `id_elemento` (`id_elemento`),
  ADD KEY `id_paciente` (`id_paciente`);

--
-- Indices de la tabla `preguntas`
--
ALTER TABLE `preguntas`
  ADD PRIMARY KEY (`id_pregunta`),
  ADD KEY `id_encuesta` (`id_encuesta`);

--
-- Indices de la tabla `respuestas_encuestas`
--
ALTER TABLE `respuestas_encuestas`
  ADD PRIMARY KEY (`id_respuesta`),
  ADD KEY `id_paciente` (`id_paciente`),
  ADD KEY `id_encuesta` (`id_encuesta`);

--
-- Indices de la tabla `rutas`
--
ALTER TABLE `rutas`
  ADD PRIMARY KEY (`id_ruta`);

--
-- Indices de la tabla `seguimiento_traslados`
--
ALTER TABLE `seguimiento_traslados`
  ADD PRIMARY KEY (`id_seguimiento`),
  ADD KEY `id_solicitud` (`id_solicitud`);

--
-- Indices de la tabla `solicitudes_traslado`
--
ALTER TABLE `solicitudes_traslado`
  ADD PRIMARY KEY (`id_solicitud`),
  ADD KEY `id_conductor` (`id_conductor`),
  ADD KEY `id_copiloto` (`id_copiloto`),
  ADD KEY `id_ambulancia` (`id_ambulancia`),
  ADD KEY `id_elemento` (`id_elemento`);

--
-- Indices de la tabla `tipos_traslado`
--
ALTER TABLE `tipos_traslado`
  ADD PRIMARY KEY (`id_tipo_traslado`);

--
-- Indices de la tabla `usuarios_sistema`
--
ALTER TABLE `usuarios_sistema`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `nombre_usuario` (`nombre_usuario`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ambulancias`
--
ALTER TABLE `ambulancias`
  MODIFY `id_ambulancia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `categorias_documentos`
--
ALTER TABLE `categorias_documentos`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `conductores`
--
ALTER TABLE `conductores`
  MODIFY `id_conductor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `copilotos`
--
ALTER TABLE `copilotos`
  MODIFY `id_copiloto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `detalles_respuestas`
--
ALTER TABLE `detalles_respuestas`
  MODIFY `id_detalle` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `documentos`
--
ALTER TABLE `documentos`
  MODIFY `id_documento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `documentos_pacientes`
--
ALTER TABLE `documentos_pacientes`
  MODIFY `id_acceso` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `elementos_traslado`
--
ALTER TABLE `elementos_traslado`
  MODIFY `id_elemento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `encuestas`
--
ALTER TABLE `encuestas`
  MODIFY `id_encuesta` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `historial_traslados`
--
ALTER TABLE `historial_traslados`
  MODIFY `id_historial` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `opciones_respuesta`
--
ALTER TABLE `opciones_respuesta`
  MODIFY `id_opcion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `id_paciente` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pacientes_traslado`
--
ALTER TABLE `pacientes_traslado`
  MODIFY `id_paciente_traslado` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `preguntas`
--
ALTER TABLE `preguntas`
  MODIFY `id_pregunta` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `respuestas_encuestas`
--
ALTER TABLE `respuestas_encuestas`
  MODIFY `id_respuesta` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `rutas`
--
ALTER TABLE `rutas`
  MODIFY `id_ruta` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `seguimiento_traslados`
--
ALTER TABLE `seguimiento_traslados`
  MODIFY `id_seguimiento` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `solicitudes_traslado`
--
ALTER TABLE `solicitudes_traslado`
  MODIFY `id_solicitud` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipos_traslado`
--
ALTER TABLE `tipos_traslado`
  MODIFY `id_tipo_traslado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios_sistema`
--
ALTER TABLE `usuarios_sistema`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalles_respuestas`
--
ALTER TABLE `detalles_respuestas`
  ADD CONSTRAINT `detalles_respuestas_ibfk_1` FOREIGN KEY (`id_respuesta`) REFERENCES `respuestas_encuestas` (`id_respuesta`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `detalles_respuestas_ibfk_2` FOREIGN KEY (`id_pregunta`) REFERENCES `preguntas` (`id_pregunta`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `detalles_respuestas_ibfk_3` FOREIGN KEY (`id_opcion`) REFERENCES `opciones_respuesta` (`id_opcion`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `documentos`
--
ALTER TABLE `documentos`
  ADD CONSTRAINT `documentos_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categorias_documentos` (`id_categoria`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `documentos_pacientes`
--
ALTER TABLE `documentos_pacientes`
  ADD CONSTRAINT `documentos_pacientes_ibfk_1` FOREIGN KEY (`id_paciente`) REFERENCES `pacientes` (`id_paciente`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `documentos_pacientes_ibfk_2` FOREIGN KEY (`id_documento`) REFERENCES `documentos` (`id_documento`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `elementos_traslado`
--
ALTER TABLE `elementos_traslado`
  ADD CONSTRAINT `elementos_traslado_ibfk_1` FOREIGN KEY (`id_tipo_traslado`) REFERENCES `tipos_traslado` (`id_tipo_traslado`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `historial_traslados`
--
ALTER TABLE `historial_traslados`
  ADD CONSTRAINT `historial_traslados_ibfk_1` FOREIGN KEY (`id_solicitud`) REFERENCES `solicitudes_traslado` (`id_solicitud`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `opciones_respuesta`
--
ALTER TABLE `opciones_respuesta`
  ADD CONSTRAINT `opciones_respuesta_ibfk_1` FOREIGN KEY (`id_pregunta`) REFERENCES `preguntas` (`id_pregunta`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `pacientes_traslado`
--
ALTER TABLE `pacientes_traslado`
  ADD CONSTRAINT `pacientes_traslado_ibfk_1` FOREIGN KEY (`id_elemento`) REFERENCES `elementos_traslado` (`id_elemento`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `pacientes_traslado_ibfk_2` FOREIGN KEY (`id_paciente`) REFERENCES `pacientes` (`id_paciente`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `preguntas`
--
ALTER TABLE `preguntas`
  ADD CONSTRAINT `preguntas_ibfk_1` FOREIGN KEY (`id_encuesta`) REFERENCES `encuestas` (`id_encuesta`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `respuestas_encuestas`
--
ALTER TABLE `respuestas_encuestas`
  ADD CONSTRAINT `respuestas_encuestas_ibfk_1` FOREIGN KEY (`id_paciente`) REFERENCES `pacientes` (`id_paciente`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `respuestas_encuestas_ibfk_2` FOREIGN KEY (`id_encuesta`) REFERENCES `encuestas` (`id_encuesta`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `seguimiento_traslados`
--
ALTER TABLE `seguimiento_traslados`
  ADD CONSTRAINT `seguimiento_traslados_ibfk_1` FOREIGN KEY (`id_solicitud`) REFERENCES `solicitudes_traslado` (`id_solicitud`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `solicitudes_traslado`
--
ALTER TABLE `solicitudes_traslado`
  ADD CONSTRAINT `solicitudes_traslado_ibfk_1` FOREIGN KEY (`id_conductor`) REFERENCES `conductores` (`id_conductor`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `solicitudes_traslado_ibfk_2` FOREIGN KEY (`id_copiloto`) REFERENCES `copilotos` (`id_copiloto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `solicitudes_traslado_ibfk_3` FOREIGN KEY (`id_ambulancia`) REFERENCES `ambulancias` (`id_ambulancia`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `solicitudes_traslado_ibfk_4` FOREIGN KEY (`id_ruta`) REFERENCES `rutas` (`id_ruta`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `solicitudes_traslado_ibfk_5` FOREIGN KEY (`id_elemento`) REFERENCES `elementos_traslado` (`id_elemento`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
