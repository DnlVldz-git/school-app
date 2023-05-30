import * as React from "react";
import { View, Image, TouchableOpacity } from "react-native";

import { useLayout } from "hooks";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";

import {
  StyleService,
  useStyleSheet,
  TopNavigation,
} from "@ui-kitten/components";
import {
  Container,
  Content,
  Text,
  NavigationAction,
  HStack,
  VStack,
} from "components";

const Policy = React.memo(() => {
  const styles = useStyleSheet(themedStyles);

  return (
    <Container style={styles.container}>
      <TopNavigation
        title={"Política de Privacidad"}
        accessoryLeft={<NavigationAction status="primary" />}
        accessoryRight={
          <NavigationAction icon="circles_four" status="primary" />
        }
      />
      <Content contentContainerStyle={styles.content}>
        <VStack level="3" padding={24} border={16}>
          <HStack mb={24}>
            <Text category="h8">
              Los datos personales que recabaremos serán aquellos que usted haya
              incluido en su perfil de cada red social con la que ingrese y esté
              habilitada en la aplicación, y serán tratados y resguardados con
              base en los principios establecidos en la legislación aplicable,
              los cuales son: licitud, consentimiento, información, calidad,
              finalidad, lealtad, proporcionalidad y responsabilidad. Para
              cumplir con las finalidades que se mencionan en el presente Aviso,
              requerimos que nos proporcione los siguientes Datos Personales:
              Nombre completo, Correo electrónico, Teléfono (fijo y móvil),
              Domicilio o Lugar de residencia actual y previos, Sexo, Estado
              Civil, Fecha de nacimiento o cumpleaños, Ocupación y Empresa donde
              labora, Historial laboral, Grado de estudios, Instituciones donde
              realizó estudios y carrera/área, Idiomas, Cursos y Proyectos,
              Aptitudes y Validaciones, Certificaciones, Sector en que labora,
              Extracto, Experiencias de Voluntariado, Reconocimientos y Premios
              Personales, su Pasatiempo Favorito, Intereses personales,
              Habilidades, Deportes que practica, Música, Películas, Libros y
              Juegos favoritos, Sitio Web, usuario de Facebook, usuario de
              LinkedIn, Google+ URL de cuenta, Links de otros perfiles, Links
              personales, Link canal de YouTube y Fotos de perfiles. Es
              importante mencionar que adicionalmente a los datos personales
              mencionados anteriormente, el Responsable podrá tratar los
              siguientes Datos Sensibles: Ideología Política y Creencias
              Religiosas.
            </Text>
          </HStack>
        </VStack>
      </Content>
    </Container>
  );
});

export default Policy;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  avatar: {
    alignSelf: "center",
    borderRadius: 32,
  },
  boxView: {
    marginTop: 15,
    width: "80%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignSelf: "center",
  },
  box: {
    borderRadius: 12,
    padding: 12,
    marginTop: 2,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignSelf: "center",
  },
  iconView: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 3,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    top: -36,
    borderColor: "background-basic-color-1",
  },
  image: {
    width: 22,
    height: 22,
    marginHorizontal: "1%",
  },
  icon: {
    width: 16,
    height: 16,
    tintColor: "color-basic-100",
  },
  card: {
    height: 210,
    borderRadius: 12,
    marginTop: 15,
    paddingTop: 14,
    paddingBottom: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  arrow: {
    width: 10,
    height: 10,
    marginTop: 8,
  },
  note: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 24,
    marginBottom: 20,
    flexDirection: "row",
    backgroundColor: "#E8EDF7",
    justifyContent: "space-between",
  },
  bottom: {
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 0,
    paddingTop: 8,
    paddingHorizontal: 24,
  },
});
