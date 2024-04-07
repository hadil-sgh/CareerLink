package tn.esprit.careerlink.entities;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Role {
    Admin,
    HR_manager,
    Consultant,
    Project_manager,
    Sales_manager,
    Employee
   /* Admin (Set.of(
            ADMIN_READ,
            ADMIN_UPDATE,
            ADMIN_CREATE,
            ADMIN_DELETE, HR_MANAGER_READ,
            HR_MANAGER_UPDATE,
            HR_MANAGER_CREATE,
            HR_MANAGER_DELETE)
    ) ,
    HR_manager (Set.of(
             HR_MANAGER_READ,
            HR_MANAGER_UPDATE,
            HR_MANAGER_CREATE,
            HR_MANAGER_DELETE)
    ),
    Project_manager (Set.of(
            Project_MANAGER_READ,
            Project_MANAGER_UPDATE,
            Project_MANAGER_CREATE,
            Project_MANAGER_DELETE)
    ),
    Consultant (Set.of(
            Consultant_READ,
            Consultant_UPDATE,
            Consultant_CREATE,
            Consultant_DELETE
        )
    ),
    Sales_manager (Set.of(
            Sales_MANAGER_READ,
            Sales_MANAGER_UPDATE,
            Sales_MANAGER_CREATE,
            Sales_MANAGER_DELETE
            )
    ),
    Employee (Set.of(
            Employee_READ,
            Employee_UPDATE,
            Employee_CREATE,
            Employee_DELETE
    )
    );


    @Getter
    private final Set<Permission> permissions;



    public List<SimpleGrantedAuthority> getAuthorities() {
        var authorities = getPermissions()
                .stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toList());
        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        return authorities;
    }*/

}
