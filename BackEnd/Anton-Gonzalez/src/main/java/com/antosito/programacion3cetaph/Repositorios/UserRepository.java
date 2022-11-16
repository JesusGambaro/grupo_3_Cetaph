package com.antosito.programacion3cetaph.Repositorios;

import com.antosito.programacion3cetaph.Entidades.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface UserRepository extends JpaRepository<User,Long> {
    User findByUsername(String username);

    @Query(value = "select username from users where :username is null or username like %:username%",
    nativeQuery = true)
    String findUserByUsername(@Param("username")String username);

    @Query(value = "select email from users where :email is null or email like %:email%",
    nativeQuery = true)
    String findEmailbyIncomingEmail(@Param("email")String email);

    boolean existsUserByName(String username);




}
