<template>
    <div class="absolute flex justify-center w-full h-screen">
        <div class="flex flex-col justify-center">
            <div class="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-3">
                <h2 class="text-lg font-bold">¡Oh no!</h2>
                <p class="text-gray-600">Este enlace ya no es válido. Vuelve a intentar registrarte.</p>
                <a href="/register">
                    <button type="submit"
                        class="w-full py-2 px-4 bg-[#6A9997] hover:bg-[#5a8886] text-white font-medium rounded-md transition duration-200">Registrarse</button>
                </a>
            </div>
        </div>
    </div>
</template>