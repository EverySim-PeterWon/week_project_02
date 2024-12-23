import numpy as np
import matplotlib.pyplot as plt
import os
import sys

# 초기 조건 설정
def initial_conditions(nx, x_start, x_end):
    x = np.linspace(x_start, x_end, nx)
    rho = np.ones(nx)
    u = np.zeros(nx)
    p = np.ones(nx) * 0.1
    rho[x < 0.5] = 1.0
    rho[x >= 0.5] = 0.125
    p[x < 0.5] = 1.0
    return x, rho, u, p

# Euler 방정식에 필요한 플럭스 계산
def compute_flux(rho, u, p, gamma):
    E = p / (gamma - 1) + 0.5 * rho * u**2
    F1 = rho * u
    F2 = rho * u**2 + p
    F3 = u * (E + p)
    return np.array([F1, F2, F3])

# 시간 전진 (Lax-Friedrichs scheme)
def lax_friedrichs(nt, dx, dt, gamma, rho, u, p):
    for t in range(nt):
        # 보존 변수 U 계산
        E = p / (gamma - 1) + 0.5 * rho * u**2
        U = np.array([rho, rho * u, E])
        F = compute_flux(rho, u, p, gamma)

        # Lax-Friedrichs 스킴 적용
        U_next = 0.5 * (np.roll(U, -1, axis=1) + np.roll(U, 1, axis=1)) - \
                 dt / (2 * dx) * (np.roll(F, -1, axis=1) - np.roll(F, 1, axis=1))
        
        # 변수 업데이트
        rho = U_next[0]
        u = U_next[1] / rho
        E = U_next[2]
        p = (gamma - 1) * (E - 0.5 * rho * u**2)

    return rho, u, p


def main(projectId):
    # 도메인 및 파라미터 설정
    nx = 100          # 공간 격자 수
    nt = 1000          # 시간 스텝 수
    x_start = 0.0     # 도메인 시작
    x_end = 1.0       # 도메인 끝
    dx = (x_end - x_start) / nx # 공간 간격(정렬 격자)
    dt = 0.001        # 시간 간격
    gamma = 1.4       # 기체 비열비

    # 초기 조건 설정
    x, rho, u, p = initial_conditions(nx, x_start, x_end)

    # Euler 방정식 풀기
    rho, u, p = lax_friedrichs(nt, dx, dt, gamma, rho, u, p)


    # 결과 플롯
    plt.close('all')
    plt.figure(figsize=(10, 6))
    plt.plot(x, rho, label='Density ($\\rho$)')
    plt.plot(x, u, label='Velocity ($u$)')
    plt.plot(x, p, label='Pressure ($p$)')
    plt.xlabel('x')
    plt.title('1D Euler Equations (Lax-Friedrichs Scheme)')
    plt.legend()
    plt.grid()

    if not os.path.exists("png"):
        os.makedirs("png")
    
    file_path = os.path.join("png", projectId + "_plot.png")
    plt.savefig(file_path)
    plt.close()

    print(file_path)
    return None

if __name__ == "__main__":
    main(sys.argv[1])
